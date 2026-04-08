"use client";

import { motion } from "framer-motion";

export function Curtain({
  side,
  open,
}: {
  side: "left" | "right";
  open: boolean;
}) {
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
