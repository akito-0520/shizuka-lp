"use client";

import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CIRCUS_BG } from "../constants/circusBackground";
import { CharacterLayer } from "./CharacterLayer";
import { Curtain } from "./atoms/Curtain";
import { StageBackground } from "./atoms/StageBackground";
import { StageDecorations } from "./atoms/StageDecorations";
import { StageHeader } from "./atoms/StageHeader";

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
      await Promise.all([
        char1Controls.start({
          x: target1X,
          transition: { duration: 3.5, ease: "linear" },
        }),
        hasTwo
          ? char2Controls.start({
              x: target2X,
              transition: { duration: 3.5, ease: "linear" },
            })
          : Promise.resolve(),
      ]);
      setPhase("arrived");
      await new Promise((r) => setTimeout(r, 700));
      setPhase("open");
      await new Promise((r) => setTimeout(r, 1500));
      setPhase("links");
    })();
  }, [char1Controls, char2Controls, hasTwo]);

  const curtainOpen =
    curtainsAlwaysOpen || phase === "open" || phase === "links";

  const characterDefs = [
    {
      controls: char1Controls,
      src: characters?.[0],
      flipX: false,
      initialX: -(bearW + 30),
    },
    ...(hasTwo
      ? [
          {
            controls: char2Controls,
            src: characters?.[1],
            flipX: false,
            initialX: 9999,
          },
        ]
      : []),
  ];

  return (
    <div className="h-screen flex flex-col" style={{ background: CIRCUS_BG }}>
      <StageHeader
        title={title}
        backHref={backHref}
        contactHref={contactHref}
      />

      <div className="flex-1 flex flex-col px-3 md:px-0 md:mx-auto md:w-full md:max-w-4xl pb-4">
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
          <StageBackground />

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
          {characterDefs.map(({ controls, src, flipX, initialX }, idx) => (
            <CharacterLayer
              key={idx}
              controls={controls}
              src={src}
              flipX={flipX}
              initialX={initialX}
              bearW={bearW}
              phase={phase}
            />
          ))}

          {/* Layer 5: Lights & Valance */}
          <StageDecorations />
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
