"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CIRCUS_BG } from "../constants/circusBackground";
import { LIGHTS } from "../constants/ligthsColor";
import { STARS } from "../constants/stars";
import { Ball } from "./Ball";
import { BEAR_ASPECT, BearSVG } from "./BearSVG";
import { Curtain } from "./Curtain";

export type CircusPhase = "walking" | "arrived" | "open" | "links";

interface CircusStageProps {
  title: string;
  contactHref?: string;
  backHref?: string;
  curtainsAlwaysOpen?: boolean;
  characters?: [string, string] | [string];
  children: (phase: CircusPhase) => React.ReactNode;
}

export function CircusStage({
  title,
  contactHref,
  backHref,
  curtainsAlwaysOpen,
  characters,
  children,
}: CircusStageProps) {
  const [phase, setPhase] = useState<CircusPhase>("walking");
  const [bearW, setBearW] = useState(120);
  const char1Controls = useAnimation();
  const char2Controls = useAnimation();
  const stageRef = useRef<HTMLDivElement>(null);

  const hasTwo = (characters?.length ?? 0) >= 2;

  useEffect(() => {
    const stageW = stageRef.current?.offsetWidth ?? 700;
    const w = Math.min(Math.max(Math.round(stageW * 0.22), 80), 200);
    setBearW(w); // eslint-disable-line react-hooks/set-state-in-effect

    const gap = 8;
    const target1X = hasTwo
      ? Math.max(stageW / 2 - w - gap, 20)
      : Math.max(stageW / 2 - w / 2, 60);
    const target2X = stageW / 2 + gap;

    char2Controls.set({ x: stageW + w + 30 });

    (async () => {
      const walk1 = char1Controls.start({
        x: target1X,
        transition: { duration: 3.5, ease: "linear" },
      });
      const walk2 = hasTwo
        ? char2Controls.start({
            x: target2X,
            transition: { duration: 3.5, ease: "linear" },
          })
        : Promise.resolve();
      await Promise.all([walk1, walk2]);
      setPhase("arrived");
      await new Promise((r) => setTimeout(r, 700));
      setPhase("open");
      await new Promise((r) => setTimeout(r, 1500));
      setPhase("links");
    })();
  }, [char1Controls, char2Controls, hasTwo]);

  const curtainOpen =
    curtainsAlwaysOpen || phase === "open" || phase === "links";

  return (
    <div className="h-screen flex flex-col" style={{ background: CIRCUS_BG }}>
      {/* Header */}
      <header className="pt-3 pb-3 px-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            {backHref && (
              <Link
                href={backHref}
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                ← 戻る
              </Link>
            )}
          </div>
          <div>
            {contactHref && (
              <Link
                href={contactHref}
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#FFD700",
                  border: "1px solid rgba(255,215,0,0.4)",
                  whiteSpace: "nowrap",
                }}
              >
                📬 お問い合わせ
              </Link>
            )}
          </div>
        </div>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-center"
          style={{
            fontFamily:
              '"New Walt Disney Font", "Arial Black", Impact, sans-serif',
            color: "#CC0000",
            textShadow: "3px 3px 0 #FFD700, 6px 6px 0 rgba(0,0,0,0.15)",
          }}
        >
          {title}
        </h1>
      </header>

      {/* Stage wrapper */}
      <div className="flex-1 flex flex-col px-3 md:px-0 md:mx-auto md:w-full md:max-w-4xl pb-4">
        {/* Stage */}
        <div
          ref={stageRef}
          className="relative flex-1 rounded-t-3xl overflow-hidden"
          style={{
            background: "#0075c2",
            border: "5px solid #b8860b",
            borderBottom: "none",
          }}
        >
          {/* Layer 0: Background */}
          {STARS.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: s.w,
                height: s.h,
                left: s.left,
                top: s.top,
                background: "#fffde7",
              }}
              animate={{ opacity: [0.9, 0.1, 0.9] }}
              transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
            />
          ))}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 65% at 50% 108%, rgba(255,255,180,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Layer 1: Scrollable content */}
          <div
            className="absolute inset-x-0 top-0 z-[5] overflow-y-auto pt-16 pb-4"
            style={{ bottom: "8%" }}
          >
            {children(phase)}
          </div>

          {/* Layer 2: Fixed floor */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "8%",
              background:
                "repeating-linear-gradient(90deg, #FFE84D 0px, #FFE84D 28px, #FF3C3C 28px, #FF3C3C 56px)",
            }}
          />

          {/* Layer 3: Curtains */}
          <Curtain side="left" open={curtainOpen} />
          <Curtain side="right" open={curtainOpen} />

          {/* Layer 4: Characters */}
          {[
            {
              controls: char1Controls,
              src: characters?.[0],
              flipX: false,
              initial: -(bearW + 30),
            },
            ...(hasTwo
              ? [
                  {
                    controls: char2Controls,
                    src: characters?.[1],
                    flipX: false,
                    initial: 9999,
                  },
                ]
              : []),
          ].map(({ controls, src, flipX, initial }, idx) => {
            const charH = Math.round(bearW * BEAR_ASPECT);
            const ballSize = Math.round(bearW * 0.5);
            return (
              <motion.div
                key={idx}
                className="absolute left-0 z-30"
                style={{
                  width: bearW,
                  height: charH,
                  bottom: "8%",
                  overflow: "visible",
                }}
                initial={{ x: initial }}
                animate={controls}
              >
                {/* Ball — only when using custom character images */}
                {src && (
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: -ballSize,
                      left: "50%",
                      translateX: "-50%",
                    }}
                    animate={{ opacity: phase === "links" ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Ball size={ballSize} />
                  </motion.div>
                )}

                {/* Bounce wrapper */}
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    scaleX: flipX ? -1 : 1,
                  }}
                  animate={
                    phase === "walking"
                      ? { y: [0, -(bearW * 0.06), 0] }
                      : phase === "arrived"
                        ? {
                            y: [
                              0,
                              -(bearW * 0.18),
                              0,
                              -(bearW * 0.11),
                              0,
                              -(bearW * 0.06),
                              0,
                            ],
                          }
                        : phase === "links"
                          ? { opacity: 0, y: bearW * 0.1 }
                          : {}
                  }
                  transition={
                    phase === "walking"
                      ? { duration: 0.38, repeat: Infinity, ease: "easeInOut" }
                      : phase === "arrived"
                        ? { duration: 0.9 }
                        : phase === "links"
                          ? { duration: 1.2, delay: 0.6, ease: "easeIn" }
                          : {}
                  }
                >
                  {src ? (
                    <Image
                      src={src}
                      alt=""
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <BearSVG isWalking={phase === "walking"} />
                  )}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Layer 5: Lights & Valance */}
          <div className="absolute top-10 left-0 right-0 z-20 flex justify-around px-4">
            {LIGHTS.map((color, i) => (
              <motion.div
                key={i}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}, 0 0 18px ${color}66`,
                }}
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{
                  duration: 0.55,
                  repeat: Infinity,
                  delay: i * 0.09,
                }}
              />
            ))}
          </div>
          <div
            className="absolute top-0 left-0 right-0 z-20 flex"
            style={{ height: 38 }}
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i % 2 === 0 ? "#CC0000" : "#FFD700",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Gold bar */}
        <div
          className="rounded-b-2xl"
          style={{
            height: 18,
            background:
              "linear-gradient(180deg, #8B6914, #FFD700 45%, #8B6914)",
          }}
        />
      </div>
    </div>
  );
}
