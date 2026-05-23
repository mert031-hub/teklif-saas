"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      style={{
        background: "var(--ocean)",
        paddingTop: "var(--section-y)",
        paddingBottom: "var(--section-y)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background atmosphere */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-50%",
            left: "-20%",
            width: "80vmax",
            height: "80vmax",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(91,164,207,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          style={{
            position: "absolute",
            bottom: "-40%",
            right: "-10%",
            width: "60vmax",
            height: "60vmax",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.25) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.15,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div
        ref={ref}
        className="container"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 48,
                height: 1,
                background: "rgba(255,255,255,0.3)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.6)",
                textTransform: "uppercase",
              }}
            >
              06 · Başlayın
            </span>
            <span
              style={{
                display: "inline-block",
                width: 48,
                height: 1,
                background: "rgba(255,255,255,0.3)",
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 7vw, 7rem)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "white",
              lineHeight: 0.95,
              marginBottom: "1.5rem",
            }}
          >
            İlk teklifinizi
            <br />
            <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>
              bugün gönderin
            </em>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 520,
              margin: "0 auto 2.5rem",
            }}
          >
            14 gün boyunca tüm özellikleri ücretsiz kullanın. Kredi kartı
            gerekmez. Kurulum yok. 5 dakikada başlayın.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <Link
              href="/register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 36px",
                borderRadius: 12,
                background: "white",
                color: "var(--ocean)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
              }}
            >
              Ücretsiz Hesap Oluştur
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            <Link
              href="#features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 28px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              }}
            >
              Özellikleri İncele
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {[
              "✓ 14 gün ücretsiz",
              "✓ Kredi kartı gerekmez",
              "✓ İstediğinde iptal",
              "✓ Kurulum yok",
            ].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 400,
                }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
