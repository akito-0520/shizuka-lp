"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Deterministic star positions (avoids hydration mismatch)
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

// ---- インフルエンサーのリンクをここに設定してください ----
const LINKS = [
  {
    name: "LINE",
    handle: "@249zxuyk",
    url: "https://line.me/R/ti/p/@249zxuyk",
    bg: "#06C755",
    img: "/img/line.png",
  },
  {
    name: "Instagram",
    handle: "@ahosta3942",
    url: "https://www.instagram.com/ahosta3942",
    bg: "#F56040",
    img: "/img/instagram.png",
  },
  {
    name: "Instagram",
    handle: "@saakku10",
    url: "https://www.instagram.com/saakku10",
    bg: "#E1306C",
    img: "/img/sakuraGram.png",
  },
  {
    name: "Instagram",
    handle: "@s___42g",
    url: "https://www.instagram.com/s___42g",
    bg: "#833AB4",
    img: "/img/shizuGram.png",
  },
  {
    name: "TikTok",
    handle: "@hcmnskr",
    url: "https://www.tiktok.com/@hcmnskr?_r=1&_t=ZS-95MODMClh6V",
    bg: "#010101",
    img: "/img/tiktok.png",
  },
];
// --------------------------------------------------------

function BearSVG({ isWalking }: { isWalking: boolean }) {
  return (
    <svg
      viewBox="0 0 100 132"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      overflow="visible"
    >
      {/* Ball — rotates while walking */}
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
      {/* Body */}
      <ellipse cx="50" cy="74" rx="18" ry="22" fill="#8B4513" />
      {/* Belly */}
      <ellipse cx="50" cy="79" rx="11" ry="14" fill="#CD853F" />
      {/* Head */}
      <circle cx="50" cy="40" r="21" fill="#8B4513" />
      {/* Ears */}
      <circle cx="32" cy="23" r="10" fill="#8B4513" />
      <circle cx="68" cy="23" r="10" fill="#8B4513" />
      <circle cx="32" cy="23" r="6" fill="#FFB6C1" />
      <circle cx="68" cy="23" r="6" fill="#FFB6C1" />
      {/* Eyes */}
      <circle cx="42" cy="37" r="3.5" fill="#111" />
      <circle cx="58" cy="37" r="3.5" fill="#111" />
      <circle cx="43" cy="36" r="1.3" fill="white" />
      <circle cx="59" cy="36" r="1.3" fill="white" />
      {/* Cheeks */}
      <circle cx="35" cy="44" r="5.5" fill="#FFB6C1" opacity="0.55" />
      <circle cx="65" cy="44" r="5.5" fill="#FFB6C1" opacity="0.55" />
      {/* Nose */}
      <ellipse cx="50" cy="47" rx="5.5" ry="4" fill="#222" />
      {/* Mouth */}
      <path
        d="M 44 52 Q 50 58 56 52"
        stroke="#222"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Arms */}
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
      {/* Circus hat */}
      <rect x="39" y="17" width="22" height="5" rx="2.5" fill="#AA0000" />
      <rect x="43" y="2" width="14" height="17" rx="3" fill="#CC0000" />
      <circle cx="50" cy="2" r="2.5" fill="#FFD700" />
      {/* Bow tie */}
      <polygon points="43,82 37,88 43,94" fill="#FFD700" />
      <polygon points="57,82 63,88 57,94" fill="#FFD700" />
      <circle cx="50" cy="88" r="4" fill="#FFD700" />
    </svg>
  );
}

// SVG viewBox aspect ratio: 100 wide × 132 tall
const BEAR_ASPECT = 132 / 100;

type Phase = "walking" | "arrived" | "open" | "links";

export default function CircusPage() {
  const [phase, setPhase] = useState<Phase>("walking");
  // bearW: default matches medium screen (used for SSR / before effect runs)
  const [bearW, setBearW] = useState(120);
  const bearControls = useAnimation();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stageW = stageRef.current?.offsetWidth ?? 700;
    // 22% of stage width, clamped between 80px (mobile) and 200px (desktop)
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

  return (
    <div
      className="h-screen flex flex-col"
      style={{
        background: [
          "radial-gradient(1px 1px at  5%  8%, #fff, transparent)",
          "radial-gradient(2px 2px at 13% 20%, #fff, transparent)",
          "radial-gradient(1px 1px at 22%  4%, rgba(255,255,255,0.8), transparent)",
          "radial-gradient(1px 1px at 34% 14%, #fff, transparent)",
          "radial-gradient(2px 2px at 47%  7%, rgba(255,255,255,0.9), transparent)",
          "radial-gradient(1px 1px at 58%  2%, #fff, transparent)",
          "radial-gradient(1px 1px at 66% 18%, rgba(255,255,255,0.7), transparent)",
          "radial-gradient(2px 2px at 76%  9%, #fff, transparent)",
          "radial-gradient(1px 1px at 88% 15%, rgba(255,255,255,0.8), transparent)",
          "radial-gradient(1px 1px at 94%  5%, #fff, transparent)",
          "radial-gradient(1px 1px at  9% 35%, rgba(255,255,255,0.6), transparent)",
          "radial-gradient(2px 2px at 19% 48%, #fff, transparent)",
          "radial-gradient(1px 1px at 31% 42%, rgba(255,255,255,0.7), transparent)",
          "radial-gradient(1px 1px at 43% 55%, rgba(255,255,255,0.5), transparent)",
          "radial-gradient(2px 2px at 55% 38%, #fff, transparent)",
          "radial-gradient(1px 1px at 67% 50%, rgba(255,255,255,0.8), transparent)",
          "radial-gradient(1px 1px at 79% 44%, #fff, transparent)",
          "radial-gradient(2px 2px at 90% 52%, rgba(255,255,255,0.9), transparent)",
          "radial-gradient(1px 1px at  4% 68%, #fff, transparent)",
          "radial-gradient(1px 1px at 16% 75%, rgba(255,255,255,0.6), transparent)",
          "radial-gradient(2px 2px at 27% 82%, #fff, transparent)",
          "radial-gradient(1px 1px at 39% 72%, rgba(255,255,255,0.7), transparent)",
          "radial-gradient(1px 1px at 51% 88%, #fff, transparent)",
          "radial-gradient(2px 2px at 63% 78%, rgba(255,255,255,0.8), transparent)",
          "radial-gradient(1px 1px at 74% 65%, rgba(255,255,255,0.5), transparent)",
          "radial-gradient(1px 1px at 84% 80%, #fff, transparent)",
          "radial-gradient(2px 2px at 96% 70%, rgba(255,255,255,0.9), transparent)",
          "radial-gradient(1px 1px at 30% 30%, rgba(180,210,255,0.9), transparent)",
          "radial-gradient(2px 2px at 70% 60%, rgba(180,210,255,0.8), transparent)",
          "radial-gradient(1px 1px at 50% 25%, rgba(200,220,255,0.7), transparent)",
          "linear-gradient(180deg, #092165ff 0%, #12317fff 40%, #1a459cff 100%)",
        ].join(", "),
      }}
    >
      {/* Title */}
      <header className="text-center pt-6 pb-3 px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
          style={{
            fontFamily:
              '"New Walt Disney Font", "Arial Black", Impact, sans-serif',
            color: "#CC0000",
            textShadow: "3px 3px 0 #FFD700, 6px 6px 0 rgba(0,0,0,0.15)",
          }}
        >
          🎪 AHO NA SHIMAI 🎪
        </h1>
      </header>

      <div className="flex-1 flex flex-col px-3 md:px-0 md:mx-auto md:w-full md:max-w-4xl pb-4">
        {/* Stage */}
        <div
          ref={stageRef}
          className="relative flex-1 rounded-t-3xl overflow-hidden flex flex-col"
          style={{
            background: "#0075c2",
            border: "5px solid #b8860b",
            borderBottom: "none",
          }}
        >
          {/* Stars */}
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

          {/* Stage floor */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: "8%",
              background:
                "repeating-linear-gradient(90deg, #FFE84D 0px, #FFE84D 28px, #FF3C3C 28px, #FF3C3C 56px)",
            }}
          />

          {/* Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 65% at 50% 108%, rgba(255,255,180,0.18) 0%, transparent 70%)",
            }}
          />

          {/* Scrollable content (behind curtains) */}
          <div className="relative z-[5] flex-1 min-h-0 overflow-y-auto pt-16 pb-4">
            {/* YouTube embed */}
            <div className="px-3 pb-4">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
                  src="https://www.youtube.com/embed/?list=UUXpHerQkfg1vPYEDRyELOAg"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* URL list */}
            <div className="flex flex-col items-center gap-3 px-4">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.handle}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden rounded-xl cursor-pointer block shrink-0"
                  style={{ width: 200 }}
                  initial={{ x: 40, opacity: 0 }}
                  animate={
                    phase === "links"
                      ? { x: 0, opacity: 1 }
                      : { x: 40, opacity: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                    delay: 0.2 + i * 0.09,
                  }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <img
                    src={link.img ?? undefined}
                    alt={link.handle}
                    className="w-full block"
                  />
                </motion.a>
              ))}
            </div>

            {/* music.jpg */}
            <div className="px-4 pt-3">
              <a href="https://linkco.re/7YFvRhX6">
                <img
                  src="/img/music.jpg"
                  alt="music"
                  className="w-full block rounded-xl"
                />
              </a>
            </div>
          </div>

          {/* Fixed bottom spacer — keeps floor/bear always visible */}
          <div
            className="shrink-0 pointer-events-none"
            style={{ height: "18%" }}
          />

          {/* Left curtain */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 z-10"
            style={{
              width: "50%",
              background:
                "repeating-linear-gradient(90deg, #7a0000 0px, #7a0000 14px, #cc0000 14px, #cc0000 24px, #990000 24px, #990000 36px)",
            }}
            animate={
              phase === "open" || phase === "links"
                ? { x: "-100%", y: "-28%" }
                : { x: "0%", y: "0%" }
            }
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{ width: 10, background: "#b8860b" }}
            />
            <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-evenly items-center">
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

          {/* Right curtain */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 z-10"
            style={{
              width: "50%",
              background:
                "repeating-linear-gradient(90deg, #990000 0px, #990000 12px, #cc0000 12px, #cc0000 22px, #7a0000 22px, #7a0000 36px)",
            }}
            animate={
              phase === "open" || phase === "links"
                ? { x: "100%", y: "-28%" }
                : { x: "0%", y: "0%" }
            }
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{ width: 10, background: "#b8860b" }}
            />
            <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-evenly items-center">
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

          {/* Bear on ball */}
          <motion.div
            className="absolute left-0 z-30"
            style={{
              width: bearW,
              height: Math.round(bearW * BEAR_ASPECT),
              bottom: "14%",
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

          {/* Stage lights */}
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

          {/* Valance (top bunting triangles) */}
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

        {/* Stage base (gold bar) */}
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
