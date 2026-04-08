"use client";

import { CircusStage } from "../circus-stage";

// ---- メールアドレスをここに設定してください ----
const CONTACT_EMAIL = "88entertaiment.nh@gmail.com";
// ------------------------------------------------

export default function ContactPage() {
  return (
    <CircusStage title="🎪 AHO NA SHIMAI 🎪" backHref="/" curtainsAlwaysOpen>
      {() => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "2rem 1rem",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily:
                '"New Walt Disney Font", "Arial Black", Impact, sans-serif',
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#FFD700",
              textShadow: "2px 2px 0 #CC0000",
              whiteSpace: "nowrap",
            }}
          >
            📬 お問い合わせ
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            お気軽にメールでご連絡ください。
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#FFD700",
              whiteSpace: "nowrap",
            }}
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      )}
    </CircusStage>
  );
}
