"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { Ball } from "./atoms/Ball";
import { BEAR_ASPECT, BearSVG } from "./atoms/BearSVG";
import { CircusPhase } from "./CircusStage";

interface CharacterLayerProps {
  controls: ReturnType<typeof useAnimation>;
  src?: string;
  flipX: boolean;
  initialX: number;
  bearW: number;
  phase: CircusPhase;
}

export function CharacterLayer({
  controls,
  src,
  flipX,
  initialX,
  bearW,
  phase,
}: CharacterLayerProps) {
  const charH = Math.round(bearW * BEAR_ASPECT);
  const ballSize = Math.round(bearW * 0.5);

  return (
    <motion.div
      className="absolute left-0 z-30"
      style={{
        width: bearW,
        height: charH,
        bottom: "8%",
        overflow: "visible",
      }}
      initial={{ x: initialX }}
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
          <Image src={src} alt="" fill style={{ objectFit: "contain" }} />
        ) : (
          <BearSVG isWalking={phase === "walking"} />
        )}
      </motion.div>
    </motion.div>
  );
}
