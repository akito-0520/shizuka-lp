"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CIRCUS_BG } from "./circus-bg";

// ── Static data ──────────────────────────────────────────
const STARS = Array.from({ length: 24 }, (_, i) => ({
  w: 2 + (i % 3),
  h: 2 + (i % 2),
  left: `${(i * 19 + 5) % 94}%`,
  top: `${(i * 13 + 3) % 44}%`,
  dur: 1 + (i % 4) * 0.35,
  delay: (i * 0.23) % 2.8,
}));

const LIGHTS = [
  "#FF3333",
  "#FFD700",
  "#33CC33",
  "#FF69B4",
  "#33BBFF",
  "#FF8C00",
  "#CC33FF",
  "#FF3333",
  "#FFD700",
  "#33CC33",
  "#FF69B4",
  "#33BBFF",
];

const BEAR_ASPECT = 132 / 100;

// ── BearSVG ──────────────────────────────────────────────
function BearSVG({ isWalking }: { isWalking: boolean }) {
  return (
    <svg
      viewBox="0 0 100 132"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      overflow="visible"
    >
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={isWalking ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isWalking ? { duration: 0.65, repeat: Infinity, ease: "linear" } : {}
        }
      >
        <circle cx="50" cy="114" r="22" fill="#FF6B35" />
        <ellipse cx="50" cy="105" rx="20" ry="6" fill="#E55A25" opacity="0.6" />
        <path
          d="M 28 114 Q 50 102 72 114"
          stroke="#FFD700"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 29 120 Q 50 128 71 120"
          stroke="#FFD700"
          strokeWidth="2.5"
          fill="none"
        />
        <line
          x1="50"
          y1="92"
          x2="50"
          y2="136"
          stroke="#FFD700"
          strokeWidth="1.5"
        />
      </motion.g>
      <ellipse cx="50" cy="74" rx="18" ry="22" fill="#8B4513" />
      <ellipse cx="50" cy="79" rx="11" ry="14" fill="#CD853F" />
      <circle cx="50" cy="40" r="21" fill="#8B4513" />
      <circle cx="32" cy="23" r="10" fill="#8B4513" />
      <circle cx="68" cy="23" r="10" fill="#8B4513" />
      <circle cx="32" cy="23" r="6" fill="#FFB6C1" />
      <circle cx="68" cy="23" r="6" fill="#FFB6C1" />
      <circle cx="42" cy="37" r="3.5" fill="#111" />
      <circle cx="58" cy="37" r="3.5" fill="#111" />
      <circle cx="43" cy="36" r="1.3" fill="white" />
      <circle cx="59" cy="36" r="1.3" fill="white" />
      <circle cx="35" cy="44" r="5.5" fill="#FFB6C1" opacity="0.55" />
      <circle cx="65" cy="44" r="5.5" fill="#FFB6C1" opacity="0.55" />
      <ellipse cx="50" cy="47" rx="5.5" ry="4" fill="#222" />
      <path
        d="M 44 52 Q 50 58 56 52"
        stroke="#222"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse
        cx="30"
        cy="70"
        rx="9"
        ry="6"
        fill="#8B4513"
        transform="rotate(-25 30 70)"
      />
      <ellipse
        cx="70"
        cy="70"
        rx="9"
        ry="6"
        fill="#8B4513"
        transform="rotate(25 70 70)"
      />
      <rect x="39" y="17" width="22" height="5" rx="2.5" fill="#AA0000" />
      <rect x="43" y="2" width="14" height="17" rx="3" fill="#CC0000" />
      <circle cx="50" cy="2" r="2.5" fill="#FFD700" />
      <polygon points="43,82 37,88 43,94" fill="#FFD700" />
      <polygon points="57,82 63,88 57,94" fill="#FFD700" />
      <circle cx="50" cy="88" r="4" fill="#FFD700" />
    </svg>
  );
}

// ── Curtain ───────────────────────────────────────────────
function Curtain({ side, open }: { side: "left" | "right"; open: boolean }) {
  const isLeft = side === "left";
  return (
    <motion.div
      className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} bottom-0 z-10`}
      style={{
        width: "50%",
        background: isLeft
          ? "repeating-linear-gradient(90deg, #7a0000 0px, #7a0000 14px, #cc0000 14px, #cc0000 24px, #990000 24px, #990000 36px)"
          : "repeating-linear-gradient(90deg, #990000 0px, #990000 12px, #cc0000 12px, #cc0000 22px, #7a0000 22px, #7a0000 36px)",
      }}
      animate={
        open
          ? { x: isLeft ? "-100%" : "100%", y: "-28%" }
          : { x: "0%", y: "0%" }
      }
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        className={`absolute ${isLeft ? "right-0" : "left-0"} top-0 bottom-0`}
        style={{ width: 10, background: "#b8860b" }}
      />
      <div
        className={`absolute ${isLeft ? "right-4" : "left-4"} top-0 bottom-0 flex flex-col justify-evenly items-center`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#FFD700",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── CircusStage (shared layout) ───────────────────────────
export type CircusPhase = "walking" | "arrived" | "open" | "links";

interface CircusStageProps {
  title: string;
  contactHref?: string;
  backHref?: string;
  curtainsAlwaysOpen?: boolean;
  children: (phase: CircusPhase) => React.ReactNode;
}

export function CircusStage({
  title,
  contactHref,
  backHref,
  curtainsAlwaysOpen,
  children,
}: CircusStageProps) {
  const [phase, setPhase] = useState<CircusPhase>("walking");
  const [bearW, setBearW] = useState(120);
  const bearControls = useAnimation();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageW = stageRef.current?.offsetWidth ?? 700;
    const w = Math.min(Math.max(Math.round(stageW * 0.22), 80), 200);
    setBearW(w);
    const targetX = Math.max(stageW / 2 - w / 2, 60);

    (async () => {
      await bearControls.start({
        x: targetX,
        transition: { duration: 3.5, ease: "linear" },
      });
      setPhase("arrived");
      await new Promise((r) => setTimeout(r, 700));
      setPhase("open");
      await new Promise((r) => setTimeout(r, 1500));
      setPhase("links");
    })();
  }, [bearControls]);

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

          {/* Layer 4: Bear */}
          <motion.div
            className="absolute left-0 z-30"
            style={{
              width: bearW,
              height: Math.round(bearW * BEAR_ASPECT),
              bottom: "8%",
            }}
            initial={{ x: -(bearW + 30) }}
            animate={bearControls}
          >
            <motion.div
              style={{ width: "100%", height: "100%" }}
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
              <BearSVG isWalking={phase === "walking"} />
            </motion.div>
          </motion.div>

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
