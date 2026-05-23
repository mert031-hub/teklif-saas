"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Canlı Takip",
    description:
      "Müşteriniz teklifi açtığında anında haberdar olun. Hangi bölümde ne kadar vakit geçirdiğini gerçek zamanlı görün.",
    tag: "Analitik",
    accent: "var(--ocean)",
  },
  {
    number: "02",
    title: "Anında Güncelleme",
    description:
      "Fiyat veya içerik değişti mi? Müşterinizin ekranı otomatik güncellenir — yeni PDF göndermeden.",
    tag: "Gerçek Zamanlı",
    accent: "var(--gold)",
  },
  {
    number: "03",
    title: "Sürükle & Bırak Editör",
    description:
      "Hero, otel kartı, video, galeri, fiyat — her bloğu saniyeler içinde yerleştirin. Kod bilgisi gerekmez.",
    tag: "Editör",
    accent: "var(--ocean)",
  },
  {
    number: "04",
    title: "Dönüşüm Analizi",
    description:
      "Hangi teklifler satışa dönüşüyor? Veriye dayalı kararlarla satış oranınızı artırın.",
    tag: "Veri",
    accent: "var(--gold)",
  },
  {
    number: "05",
    title: "Akıllı Paylaşım",
    description:
      "WhatsApp, e-posta veya QR kod ile tek tıkla paylaşın. Müşteri hesap açmadan görüntüler.",
    tag: "Paylaşım",
    accent: "var(--ocean)",
  },
  {
    number: "06",
    title: "5 Dakikada Teklif",
    description:
      "Şablondan başlayın, blokları düzenleyin, fiyatı girin. Teklif hazır. Rakiplerinizden önce müşteride.",
    tag: "Hız",
    accent: "var(--gold)",
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "var(--space-2xl) 0",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      {/* Mobile: stacked, number on top */}
      <div
        className="block md:hidden"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-lg)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 15vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.85,
            color: "transparent",
            WebkitTextStroke: `1px ${feature.accent === "var(--ocean)" ? "rgba(27,79,114,0.2)" : "rgba(201,169,110,0.3)"}`,
            letterSpacing: "-0.03em",
            userSelect: "none",
          }}
        >
          {feature.number}
        </div>
        <FeatureContent feature={feature} />
      </div>

      {/* Tablet+: side by side, alternating */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-3xl)",
          alignItems: "center",
        }}
      >
        <div
          style={{
            order: isEven ? 0 : 1,
            textAlign: isEven ? "left" : "right",
          }}
        >
          <motion.div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 12vw, 10rem)",
              fontWeight: 300,
              lineHeight: 0.85,
              color: "transparent",
              WebkitTextStroke: `1px ${feature.accent === "var(--ocean)" ? "rgba(27,79,114,0.15)" : "rgba(201,169,110,0.25)"}`,
              letterSpacing: "-0.03em",
              userSelect: "none",
              transition: "all 0.4s",
            }}
            whileHover={
              {
                WebkitTextStroke: `1px ${feature.accent}`,
              } as any
            }
          >
            {feature.number}
          </motion.div>
        </div>
        <div style={{ order: isEven ? 1 : 0 }}>
          <FeatureContent feature={feature} />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureContent({ feature }: { feature: (typeof features)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 999,
          background:
            feature.accent === "var(--ocean)"
              ? "rgba(27,79,114,0.08)"
              : "rgba(201,169,110,0.12)",
          marginBottom: "var(--space-md)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            color: feature.accent,
            textTransform: "uppercase",
          }}
        >
          {feature.tag}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-title)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "var(--ink)",
          lineHeight: 1.1,
          marginBottom: "var(--space-md)",
        }}
      >
        {feature.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          lineHeight: 1.85,
          color: "var(--muted)",
          maxWidth: 400,
        }}
      >
        {feature.description}
      </p>

      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: 48 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          height: 1,
          background: feature.accent,
          marginTop: "var(--space-lg)",
        }}
      />
    </div>
  );
}

export function Features() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="features"
      className="section"
      style={{ background: "var(--ivory)" }}
    >
      <div className="container">
        <div ref={titleRef} style={{ marginBottom: "var(--space-xl)" }}>
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
              <span className="t-label">02 · Özellikler</span>
            </div>
            <h2
              className="t-display"
              style={{ color: "var(--ink)", maxWidth: 620 }}
            >
              Satışı bir sanat formuna{" "}
              <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                dönüştürün
              </em>
            </h2>
          </motion.div>
        </div>

        {features.map((f, i) => (
          <FeatureRow key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}
