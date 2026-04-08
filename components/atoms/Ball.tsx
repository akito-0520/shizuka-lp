"use client";

import { motion } from "framer-motion";

export function Ball({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size}>
      <motion.g
        style={{ transformOrigin: "22px 22px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="22" cy="22" r="22" fill="#FF6B35" />
        <ellipse cx="22" cy="12" rx="19" ry="5" fill="#E55A25" opacity="0.6" />
        <path
          d="M 0 22 Q 22 10 44 22"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 1 28 Q 22 36 43 28"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="22"
          y1="0"
          x2="22"
          y2="44"
          stroke="#FFD700"
          strokeWidth="1.5"
        />
      </motion.g>
    </svg>
  );
}
