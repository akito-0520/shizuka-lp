"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CircusStage } from "../components/CircusStage";
import { LINKS } from "../constants/links";

export default function CircusPage() {
  return (
    <CircusStage
      title="🎪 AHO NA SHIMAI 🎪"
      contactHref="/contact"
      characters={["/img/shizuka.png", "/img/sakura.png"]}
    >
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
            <a href="https://linkco.re/7YFvRhX6" className="w-full mt-1">
              <Image
                src="/img/music.jpg"
                alt="music"
                width={800}
                height={400}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  borderRadius: "0.75rem",
                }}
              />
            </a>
          </div>
        </>
      )}
    </CircusStage>
  );
}
