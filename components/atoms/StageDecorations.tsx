"use client";

import { motion } from "framer-motion";
import { LIGHTS } from "../../constants/lightsColor";

export function StageDecorations() {
  return (
    <>
      {/* Lights */}
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

      {/* Valance */}
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
    </>
  );
}
