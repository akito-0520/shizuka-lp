"use client";

import { motion } from "framer-motion";
import { CircusStage } from "./circus-stage";

// ---- インフルエンサーのリンクをここに設定してください ----
const LINKS = [
  {
    name: "LINE",
    handle: "@249zxuyk",
    url: "https://line.me/R/ti/p/@249zxuyk",
    img: "/img/line.png",
  },
  {
    name: "Instagram",
    handle: "@ahosta3942",
    url: "https://www.instagram.com/ahosta3942",
    img: "/img/instagram.png",
  },
  {
    name: "Instagram",
    handle: "@saakku10",
    url: "https://www.instagram.com/saakku10",
    img: "/img/sakuraGram.png",
  },
  {
    name: "Instagram",
    handle: "@s___42g",
    url: "https://www.instagram.com/s___42g",
    img: "/img/shizuGram.png",
  },
  {
    name: "TikTok",
    handle: "@hcmnskr",
    url: "https://www.tiktok.com/@hcmnskr?_r=1&_t=ZS-95MODMClh6V",
    img: "/img/tiktok.png",
  },
];
// --------------------------------------------------------

export default function CircusPage() {
  return (
    <CircusStage title="🎪 AHO NA SHIMAI 🎪" contactHref="/contact">
      {(phase) => (
        <>
          {/* YouTube */}
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

          {/* Links + Music */}
          <div className="flex flex-col items-center gap-3 px-4">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.handle}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl cursor-pointer block shrink-0"
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
                  src={link.img}
                  alt={link.handle}
                  className="w-full block"
                />
              </motion.a>
            ))}
            <a href="https://linkco.re/7YFvRhX6" className="w-full mt-1">
              <img
                src="/img/music.jpg"
                alt="music"
                className="w-full block rounded-xl"
              />
            </a>
          </div>
        </>
      )}
    </CircusStage>
  );
}
