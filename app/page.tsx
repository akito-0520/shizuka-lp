"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CircusStage } from "../components/CircusStage";
import { LINKS } from "../constants/links";

export default function Home() {
  return (
    <CircusStage
      title="🎪 AHO NA SHIMAI 🎪"
      contactHref="/contact"
      characters={["/images/shizuka.png", "/images/sakura.png"]}
    >
      {(phase) => (
        <>
          {/* YouTube */}
          <div className="px-3 pb-4">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-black text-center mb-4"
              style={{
                fontFamily:
                  '"New Walt Disney Font", "Arial Black", Impact, sans-serif',
                color: "#FFD700",
                textShadow: "2px 2px 0 #CC0000, 4px 4px 0 rgba(0,0,0,0.2)",
                letterSpacing: "0.05em",
              }}
            >
              🎬 最新の動画 🎬
            </h1>
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
                className="overflow-hidden rounded-xl cursor-pointer block shrink-0 w-2/3 sm:w-56 md:w-64"
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
                <Image
                  src={link.img}
                  alt={link.handle}
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </motion.a>
            ))}
            <div className="w-full sm:w-[21rem] md:w-96 flex flex-col">
              <a
                href="https://linkco.re/7YFvRhX6"
                className="block mt-1"
                style={{
                  borderRadius: "0.75rem",
                  boxShadow:
                    "0 0 12px rgba(255,215,0,0.5), 0 4px 16px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,215,0,0.4)",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "scale(1.05) translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 20px rgba(255,215,0,0.7), 0 8px 24px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 12px rgba(255,215,0,0.5), 0 4px 16px rgba(0,0,0,0.4)";
                }}
              >
                <Image
                  src="/images/music.jpg"
                  alt="music"
                  width={400}
                  height={200}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </a>
            </div>
          </div>
        </>
      )}
    </CircusStage>
  );
}
