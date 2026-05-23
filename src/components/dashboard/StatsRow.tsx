"use client";

import { motion } from "framer-motion";

interface StatsRowProps {
  stats: {
    total: number;
    sent: number;
    accepted: number;
    conversion: number;
  };
}

const statConfig = [
  {
    key: "total" as const,
    label: "Toplam Teklif",
    suffix: "",
    color: "var(--ocean)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M3 2.5C3 1.67 3.67 1 4.5 1H11L15 5V15.5C15 16.33 14.33 17 13.5 17H4.5C3.67 17 3 16.33 3 15.5V2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M11 1V5H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 9H12M6 12H10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    key: "sent" as const,
    label: "Gönderilen",
    suffix: "",
    color: "#5BA4CF",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M2 9L16 2L9 16L8 10L2 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "accepted" as const,
    label: "Kabul Edilen",
    suffix: "",
    color: "#4A7C6B",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5.5 9L7.5 11L12.5 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: "conversion" as const,
    label: "Dönüşüm Oranı",
    suffix: "%",
    color: "#C9A96E",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M1 13L5.5 8L8.5 11L13 5L17 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      {statConfig.map((stat, i) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: "1.5rem",
            boxShadow: "0 1px 4px rgba(26,26,46,0.04)",
            transition: "all 0.25s ease",
          }}
          whileHover={{ y: -2, boxShadow: "0 6px 24px rgba(26,26,46,0.08)" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: `${stat.color}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "var(--dim)",
                textTransform: "uppercase",
              }}
            >
              Bu ay
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.4rem",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "var(--ink)",
              marginBottom: "0.4rem",
            }}
          >
            {stats[stat.key]}
            {stat.suffix}
          </div>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--muted)",
            }}
          >
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
