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
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric background */}
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
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: "var(--space-xl)",
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
              className="t-label"
              style={{ color: "rgba(255,255,255,0.6)" }}
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

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--t-hero)",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              color: "white",
              lineHeight: 0.95,
              marginBottom: "var(--space-lg)",
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
              fontSize: "var(--t-body)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 520,
              margin: "0 auto var(--space-2xl)",
            }}
          >
            14 gün boyunca tüm özellikleri ücretsiz kullanın. Kredi kartı
            gerekmez. Kurulum yok. 5 dakikada başlayın.
          </motion.p>

          {/* CTAs — CSS class hover, no onMouseEnter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "var(--space-md)",
              marginBottom: "var(--space-2xl)",
            }}
          >
            {/* Primary — white button */}
            <Link
              href="/register"
              className="btn-white"
              style={{ color: "var(--ocean)" }}
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

            {/* Secondary */}
            <a
              href="#features"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "clamp(14px, 2vw, 18px) clamp(24px, 4vw, 28px)",
                borderRadius: "var(--radius-md)",
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.9)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
                transition: "background var(--duration-fast)",
              }}
            >
              Özellikleri İncele
            </a>
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
              gap: "var(--space-xl)",
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
                  fontSize: "var(--t-small)",
                  color: "rgba(255,255,255,0.55)",
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
