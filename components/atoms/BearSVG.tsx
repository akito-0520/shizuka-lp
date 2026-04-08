"use client";

import { motion } from "framer-motion";

export const BEAR_ASPECT = 132 / 100;

export function BearSVG({ isWalking }: { isWalking: boolean }) {
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
