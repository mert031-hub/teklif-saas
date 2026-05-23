"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Başlangıç",
    price: { monthly: 490, yearly: 390 },
    description: "Bireysel acenteler ve yeni başlayanlar için.",
    features: [
      "20 aktif teklif",
      "Temel bloklar (Hero, Fiyat, Galeri)",
      "Teklif görüntüleme analizi",
      "WhatsApp & link paylaşım",
      "PDF export",
      "5 GB medya depolama",
      "E-posta desteği",
    ],
    cta: "Ücretsiz Başla",
    popular: false,
    accent: "var(--ink-soft)",
  },
  {
    name: "Profesyonel",
    price: { monthly: 990, yearly: 790 },
    description: "Büyüyen acenteler ve aktif satış ekipleri için.",
    features: [
      "Sınırsız aktif teklif",
      "Tüm bloklar + Video entegrasyonu",
      "Gelişmiş analitik & ısı haritası",
      "Özel marka rengi & logo",
      "Ekip üyeleri (3 kişi)",
      "50 GB medya depolama",
      "Öncelikli destek & API",
    ],
    cta: "14 Gün Ücretsiz Dene",
    popular: true,
    accent: "var(--ocean)",
  },
  {
    name: "Kurumsal",
    price: { monthly: 2490, yearly: 1990 },
    description: "Çok şubeli zincirler ve tur operatörleri için.",
    features: [
      "Her şey Pro'da dahil",
      "Sınırsız ekip üyesi",
      "Özel domain",
      "White-label",
      "Dedicated account manager",
      "500 GB medya depolama",
      "SLA + özel entegrasyonlar",
    ],
    cta: "Satış Ekibiyle Görüş",
    popular: false,
    accent: "var(--gold)",
  },
];

function PlanCard({
  plan,
  index,
  yearly,
}: {
  plan: (typeof plans)[0];
  index: number;
  yearly: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const price = yearly ? plan.price.yearly : plan.price.monthly;

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
        background: plan.popular ? "var(--ocean)" : "var(--bg-card)",
        border: plan.popular ? "none" : "1px solid var(--border)",
        borderRadius: 20,
        padding: "2.5rem",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transform: plan.popular ? "scale(1.03)" : "scale(1)",
        boxShadow: plan.popular
          ? "0 20px 60px rgba(27,79,114,0.25)"
          : "0 2px 12px rgba(26,26,46,0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      whileHover={{
        y: -4,
        boxShadow: plan.popular
          ? "0 28px 70px rgba(27,79,114,0.35)"
          : "0 10px 40px rgba(26,26,46,0.1)",
      }}
    >
      {plan.popular && (
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--gold)",
            color: "var(--ink)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            padding: "6px 16px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          EN POPÜLER
        </div>
      )}

      <div style={{ marginBottom: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: plan.popular ? "rgba(255,255,255,0.6)" : "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          {plan.name}
        </span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "3rem",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          color: plan.popular ? "white" : "var(--ink)",
          lineHeight: 1,
          marginBottom: "0.25rem",
        }}
      >
        <motion.span
          key={price}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          ₺{price.toLocaleString("tr-TR")}
        </motion.span>
        <span
          style={{
            fontSize: "1rem",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            opacity: 0.6,
          }}
        >
          /ay
        </span>
      </div>

      {yearly && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--sage)",
            marginBottom: "0.75rem",
          }}
        >
          Yıllık ödeme · %20 tasarruf
        </div>
      )}

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--muted)",
          marginBottom: "1.5rem",
        }}
      >
        {plan.description}
      </p>

      <div
        style={{
          height: 1,
          background: plan.popular ? "rgba(255,255,255,0.15)" : "var(--border)",
          marginBottom: "1.5rem",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          flex: 1,
          marginBottom: "2rem",
        }}
      >
        {plan.features.map((f, j) => (
          <li
            key={j}
            style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                flexShrink: 0,
                background: plan.popular
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(27,79,114,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path
                  d="M1.5 4.5L3.5 6.5L7.5 2.5"
                  stroke={plan.popular ? "white" : "var(--ocean)"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                color: plan.popular
                  ? "rgba(255,255,255,0.85)"
                  : "var(--ink-soft)",
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={plan.name === "Kurumsal" ? "/contact" : "/register"}
        style={{
          display: "block",
          textAlign: "center",
          padding: "13px 24px",
          borderRadius: 10,
          background: plan.popular ? "white" : "var(--ocean)",
          color: plan.popular ? "var(--ocean)" : "white",
          fontFamily: "var(--font-body)",
          fontSize: "0.88rem",
          fontWeight: 600,
          textDecoration: "none",
          border: plan.popular ? "none" : "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {plan.cta}
      </Link>
    </motion.div>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="pricing"
      style={{
        background: "var(--ivory)",
        paddingTop: "var(--section-y)",
        paddingBottom: "var(--section-y)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div
          ref={titleRef}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
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
                justifyContent: "center",
                gap: 12,
                marginBottom: "1.25rem",
              }}
            >
              <span className="gold-line" />
              <span className="label">04 · Fiyatlandırma</span>
              <span className="gold-line" />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.0,
                marginBottom: "1.5rem",
              }}
            >
              Satışınız arttıkça{" "}
              <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                kendini öder
              </em>
            </h2>

            {/* Toggle */}
            <div
              style={{ display: "inline-flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  color: yearly ? "var(--dim)" : "var(--ink)",
                  fontWeight: 500,
                }}
              >
                Aylık
              </span>
              <button
                onClick={() => setYearly(!yearly)}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 999,
                  background: yearly ? "var(--ocean)" : "var(--dune)",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.3s",
                }}
              >
                <motion.div
                  animate={{ x: yearly ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    position: "absolute",
                    top: 2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                  }}
                />
              </button>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    color: yearly ? "var(--ink)" : "var(--dim)",
                    fontWeight: 500,
                  }}
                >
                  Yıllık
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(107,143,113,0.1)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "var(--sage)",
                  }}
                >
                  %20 İNDİRİM
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          {plans.map((plan, i) => (
            <PlanCard key={i} plan={plan} index={i} yearly={yearly} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.14em",
            color: "var(--dim)",
            textTransform: "uppercase",
          }}
        >
          14 gün ücretsiz · Kredi kartı gerekmez · İstediğinde iptal
        </motion.p>
      </div>
    </section>
  );
}
