"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Teklif Oluştur",
    description:
      "Şablonlardan birini seç, bloklarını sürükle-bırak ile düzenle. Otel, uçuş, galeri, video, fiyat — her şey hazır.",
    detail: "Ort. 4 dakika 38 saniye",
  },
  {
    number: "02",
    title: "Müşteriye Gönder",
    description:
      "WhatsApp veya e-posta ile tek tıkla paylaş. Müşteri hesap açmadan, uygulama indirmeden anında görüntüler.",
    detail: "Link · QR Kod · E-posta",
  },
  {
    number: "03",
    title: "Takip Et",
    description:
      "Müşteri teklifi açtığında bildirim alırsın. Hangi bölümde ne kadar vakit geçirdiğini anlık olarak görürsün.",
    detail: "Anlık bildirim · Isı haritası",
  },
  {
    number: "04",
    title: "Satışa Dönüştür",
    description:
      "Müşteri en çok neye baktı? Bu verilerle doğru anda, doğru argümanla ara. Satışı kapat.",
    detail: "Ort. %3.2× daha yüksek kapanış",
  },
];

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        padding: "2.5rem",
        borderRight:
          index < steps.length - 1 ? "1px solid var(--border)" : "none",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--ocean-pale)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "3.5rem",
          fontWeight: 300,
          color: "rgba(27,79,114,0.12)",
          lineHeight: 1,
          marginBottom: "1.5rem",
          letterSpacing: "-0.03em",
        }}
      >
        {step.number}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          marginBottom: "0.75rem",
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.88rem",
          lineHeight: 1.8,
          color: "var(--muted)",
          marginBottom: "1.5rem",
        }}
      >
        {step.description}
      </p>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          borderRadius: 999,
          background: "rgba(27,79,114,0.06)",
          border: "1px solid rgba(27,79,114,0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            color: "var(--ocean)",
            textTransform: "uppercase",
          }}
        >
          {step.detail}
        </span>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="how-it-works"
      style={{
        background: "var(--sand)",
        paddingTop: "var(--section-y)",
        paddingBottom: "var(--section-y)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            marginBottom: "5rem",
            alignItems: "end",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "1.25rem",
              }}
            >
              <span className="gold-line" />
              <span className="label">03 · Nasıl Çalışır</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.0,
              }}
            >
              Dört adımda{" "}
              <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                mükemmel satış
              </em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              lineHeight: 1.85,
              color: "var(--muted)",
              alignSelf: "end",
            }}
          >
            Kurulum yok. Kredi kartı gerekmez. 14 gün boyunca tüm özellikleri
            ücretsiz kullanın ve farkı ilk tekliften hissedin.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            border: "1px solid var(--border)",
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--bg-card)",
          }}
        >
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "4rem" }}
        >
          <Link
            href="/register"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 36px",
              borderRadius: 12,
              background: "var(--ocean)",
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(27,79,114,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#154360";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(27,79,114,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--ocean)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 20px rgba(27,79,114,0.2)";
            }}
          >
            Hemen Dene — Ücretsiz
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
