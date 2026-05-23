"use client";

import { motion } from "framer-motion";

const agencies = [
  "Jolly Tur",
  "Setur",
  "Odeon Tours",
  "Tatilbudur",
  "Enuygun",
  "Paket Yol",
  "Turna",
  "Club Med",
  "Jolly Tur",
  "Setur",
  "Odeon Tours",
  "Tatilbudur",
  "Enuygun",
  "Paket Yol",
  "Turna",
  "Club Med",
];

export function LogoStrip() {
  return (
    <section
      style={{
        background: "var(--sand)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "2.5rem 0",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span className="label">
          Türkiye'nin önde gelen acenteleri tarafından kullanılıyor
        </span>
      </div>

      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", width: "max-content" }}
        >
          {agencies.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "rgba(26,26,46,0.35)",
                  whiteSpace: "nowrap",
                  transition: "color 0.4s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ocean)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(26,26,46,0.35)")
                }
              >
                {name}
              </span>
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "2.5rem",
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "var(--gold)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
