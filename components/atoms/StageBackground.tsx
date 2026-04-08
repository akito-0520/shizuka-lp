"use client";

import { motion } from "framer-motion";
import { STARS } from "../../constants/stars";

export function StageBackground() {
  return (
    <>
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
    </>
  );
}
