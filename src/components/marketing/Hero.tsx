"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/lib/hooks/useBreakpoint";

function AtmosphericBackground() {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, #F0EBE0 0%, #E8E0D0 40%, #D4C9B5 100%)",
        }}
      />
      <motion.div
        animate={
          reduced ? {} : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "70vmax",
          height: "70vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.35) 0%, rgba(201,169,110,0.1) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={
          reduced ? {} : { scale: [1, 1.1, 1], opacity: [0.4, 0.65, 0.4] }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "-5%",
          width: "55vmax",
          height: "55vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,164,207,0.3) 0%, rgba(27,79,114,0.15) 40%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(26,26,46,0.08) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}

/* Floating tags — hidden on mobile, visible md+ */
const destinations = [
  { name: "Maldivler", pos: { top: "20%", left: "4%" }, delay: 0.5 },
  { name: "Santorini", pos: { top: "65%", left: "3%" }, delay: 0.7 },
  { name: "Bali", pos: { top: "22%", right: "4%" }, delay: 0.6 },
  { name: "Dubai", pos: { top: "68%", right: "4%" }, delay: 0.8 },
];

function FloatingTags() {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      {destinations.map((dest) => (
        <motion.div
          key={dest.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: dest.delay + 0.8,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          /* Hidden on mobile/tablet — only desktop */
          className="hidden lg:block"
          style={{ position: "absolute", ...dest.pos, zIndex: 5 }}
        >
          <motion.div
            animate={reduced ? {} : { y: [0, -8, 0] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
              background: "rgba(250,248,244,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(26,26,46,0.08)",
              borderRadius: 999,
              boxShadow: "0 4px 20px rgba(26,26,46,0.08)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--ocean)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-label)",
                fontWeight: 500,
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              {dest.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}

function HeroContent() {
  const { scrollY } = useScroll();
  const reduced = usePrefersReducedMotion();
  const y = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const springY = useSpring(y, { stiffness: 80, damping: 25 });

  return (
    <motion.div
      style={{ y: springY, opacity, position: "relative", zIndex: 10 }}
      className="container"
    >
      <div style={{ textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: "var(--space-xl)",
          }}
        >
          <span className="gold-line" />
          <span className="t-label">
            Turizm Acenteleri için Teklif Platformu
          </span>
          <span className="gold-line" />
        </motion.div>

        {/* Headline — staggered lines */}
        <div style={{ marginBottom: "var(--space-lg)", overflow: "hidden" }}>
          {[
            { text: "Müşterinizi", italic: false },
            { text: "büyüleyen", italic: true },
            { text: "teklifler oluşturun", italic: false },
          ].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="t-display"
                style={{
                  color: line.italic ? "var(--ocean)" : "var(--ink)",
                  fontStyle: line.italic ? "italic" : "normal",
                }}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-body)",
            lineHeight: 1.85,
            color: "var(--muted)",
            maxWidth: 520,
            margin: "0 auto var(--space-2xl)",
          }}
        >
          PDF göndermek yerine — müşterinizin hayalini kurarken izlediği, anlık
          güncellenen, takip edebildiğiniz interaktif seyahat teklifleri.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-md)",
            marginBottom: "var(--space-2xl)",
          }}
        >
          <Link href="/register" className="btn-primary">
            Ücretsiz Başla
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>

          <a href="#how-it-works" className="btn-ghost">
            Nasıl Çalışır?
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(1.5rem, 5vw, 3rem)",
            paddingTop: "var(--space-xl)",
            borderTop: "1px solid rgba(26,26,46,0.1)",
          }}
        >
          {[
            { value: "3.2×", label: "Daha Yüksek Dönüşüm" },
            { value: "%94", label: "Müşteri Memnuniyeti" },
            { value: "< 5dk", label: "Teklif Oluşturma" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              style={{ textAlign: "center" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--t-title)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "var(--ocean)",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-label)",
                  color: "var(--muted)",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "var(--space-2xl)",
        overflow: "hidden",
      }}
    >
      <AtmosphericBackground />
      <FloatingTags />
      <HeroContent />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: "var(--space-xl)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{
            width: 28,
            height: 44,
            borderRadius: 99,
            border: "1.5px solid rgba(26,26,46,0.2)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 6,
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: "var(--ocean)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
