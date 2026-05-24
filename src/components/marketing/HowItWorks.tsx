"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Teklif Oluştur",
    description:
      "Şablonlardan birini seç, bloklarını düzenle. Otel, uçuş, galeri, video, fiyat — her şey hazır.",
    detail: "Ort. 4 dakika 38 saniye",
  },
  {
    number: "02",
    title: "Müşteriye Gönder",
    description:
      "WhatsApp veya e-posta ile tek tıkla paylaş. Müşteri hesap açmadan anında görüntüler.",
    detail: "Link · QR Kod · E-posta",
  },
  {
    number: "03",
    title: "Takip Et",
    description:
      "Müşteri teklifi açtığında bildirim alırsın. Hangi bölümde ne kadar kaldığını anlık görürsün.",
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      /* CSS hover via .row-hover class */
      className="row-hover"
      style={{ padding: "var(--space-xl)", cursor: "default" }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
          fontWeight: 300,
          lineHeight: 1,
          color: "rgba(27,79,114,0.14)",
          letterSpacing: "-0.03em",
          marginBottom: "var(--space-lg)",
        }}
      >
        {step.number}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-subtitle)",
          fontWeight: 400,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
          marginBottom: "var(--space-sm)",
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-small)",
          lineHeight: 1.8,
          color: "var(--muted)",
          marginBottom: "var(--space-lg)",
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
            fontSize: "var(--t-label)",
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
      className="section"
      style={{
        background: "var(--sand)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: "var(--space-3xl)" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "var(--space-2xl)", alignItems: "end" }}
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
                  marginBottom: "var(--space-md)",
                }}
              >
                <span className="gold-line" />
                <span className="t-label">03 · Nasıl Çalışır</span>
              </div>
              <h2 className="t-display" style={{ color: "var(--ink)" }}>
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
                fontSize: "var(--t-body)",
                lineHeight: 1.85,
                color: "var(--muted)",
              }}
            >
              Kurulum yok. Kredi kartı gerekmez. 14 gün boyunca tüm özellikleri
              ücretsiz kullanın.
            </motion.p>
          </div>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            background: "var(--bg-card)",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                borderRight:
                  i < steps.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>

        {/* CTA — CSS btn-primary class */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "var(--space-3xl)" }}
        >
          <Link href="/register" className="btn-primary">
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
