"use client";

import Link from "next/link";

interface StageHeaderProps {
  title: string;
  backHref?: string;
  contactHref?: string;
}

export function StageHeader({
  title,
  backHref,
  contactHref,
}: StageHeaderProps) {
  return (
    <header className="pt-3 pb-3 px-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          {backHref && (
            <Link
              href={backHref}
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FFD700",
                border: "1px solid rgba(255,215,0,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              ← 戻る
            </Link>
          )}
        </div>
        <div>
          {contactHref && (
            <Link
              href={contactHref}
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#FFD700",
                border: "1px solid rgba(255,215,0,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              📬 お問い合わせ
            </Link>
          )}
        </div>
      </div>
      <h1
        className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-center"
        style={{
          fontFamily:
            '"New Walt Disney Font", "Arial Black", Impact, sans-serif',
          color: "#CC0000",
          textShadow: "3px 3px 0 #FFD700, 6px 6px 0 rgba(0,0,0,0.15)",
        }}
      >
        {title}
      </h1>
    </header>
  );
}
