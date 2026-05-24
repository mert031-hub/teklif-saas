"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    name: "Başlangıç",
    nameEn: "STARTER",
    price: { monthly: 490, yearly: 390 },
    description: "Bireysel acenteler ve yeni başlayanlar için.",
    features: [
      "20 aktif teklif",
      "Temel bloklar",
      "Görüntüleme analizi",
      "WhatsApp & link paylaşım",
      "PDF export",
      "5 GB medya",
      "E-posta desteği",
    ],
    cta: "Ücretsiz Başla",
    href: "/register",
    popular: false,
  },
  {
    name: "Profesyonel",
    nameEn: "PRO",
    price: { monthly: 990, yearly: 790 },
    description: "Büyüyen acenteler ve aktif satış ekipleri için.",
    features: [
      "Sınırsız teklif",
      "Tüm bloklar + Video",
      "Gelişmiş analitik & ısı haritası",
      "Özel marka rengi & logo",
      "Ekip üyeleri (3)",
      "50 GB medya",
      "Öncelikli destek & API",
    ],
    cta: "14 Gün Ücretsiz Dene",
    href: "/register",
    popular: true,
  },
  {
    name: "Kurumsal",
    nameEn: "ENTERPRISE",
    price: { monthly: 2490, yearly: 1990 },
    description: "Çok şubeli zincirler ve tur operatörleri için.",
    features: [
      "Her şey Pro'da dahil",
      "Sınırsız ekip üyesi",
      "Özel domain",
      "White-label",
      "Dedicated account manager",
      "500 GB medya",
      "SLA + özel entegrasyonlar",
    ],
    cta: "Satış Ekibiyle Görüş",
    href: "/contact",
    popular: false,
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      /* card-hover for lift effect — CSS only */
      className={plan.popular ? "" : "card-hover"}
      style={{
        background: plan.popular ? "var(--ocean)" : "var(--bg-card)",
        border: plan.popular ? "none" : "1px solid var(--border)",
        borderRadius: "var(--radius-xl)",
        padding: "var(--space-xl)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transform: plan.popular ? "scale(1.03)" : "scale(1)",
        boxShadow: plan.popular
          ? "0 20px 60px rgba(27,79,114,0.25)"
          : "0 2px 12px rgba(26,26,46,0.06)",
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
            fontSize: "var(--t-label)",
            padding: "6px 16px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          EN POPÜLER
        </div>
      )}

      <div style={{ marginBottom: "var(--space-xs)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            color: plan.popular ? "rgba(255,255,255,0.6)" : "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          {plan.nameEn}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-subtitle)",
          fontWeight: 400,
          color: plan.popular ? "white" : "var(--ink)",
          marginBottom: "var(--space-sm)",
        }}
      >
        {plan.name}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-small)",
          color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--muted)",
          marginBottom: "var(--space-lg)",
          lineHeight: 1.6,
        }}
      >
        {plan.description}
      </p>

      {/* Price */}
      <div style={{ marginBottom: "var(--space-lg)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                color: plan.popular ? "white" : "var(--ink)",
                lineHeight: 1,
              }}
            >
              ₺{price.toLocaleString("tr-TR")}
            </motion.span>
          </AnimatePresence>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: plan.popular ? "rgba(255,255,255,0.6)" : "var(--muted)",
              fontSize: "var(--t-small)",
            }}
          >
            /ay
          </span>
        </div>
        {yearly && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-label)",
              color: plan.popular ? "rgba(255,255,255,0.7)" : "var(--sage)",
              marginTop: 4,
            }}
          >
            Yıllık ödeme · %20 tasarruf
          </p>
        )}
      </div>

      <div
        style={{
          height: 1,
          background: plan.popular ? "rgba(255,255,255,0.15)" : "var(--border)",
          marginBottom: "var(--space-lg)",
        }}
      />

      <ul
        style={{
          listStyle: "none",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-xl)",
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
                fontSize: "var(--t-small)",
                color: plan.popular
                  ? "rgba(255,255,255,0.85)"
                  : "var(--ink-soft)",
                lineHeight: 1.6,
              }}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA — white or primary CSS class */}
      <Link
        href={plan.href}
        className={plan.popular ? "btn-white" : "btn-primary"}
        style={{ justifyContent: "center" }}
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
      className="section"
      style={{
        background: "var(--ivory)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container">
        <div
          ref={titleRef}
          style={{ textAlign: "center", marginBottom: "var(--space-3xl)" }}
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
                marginBottom: "var(--space-md)",
              }}
            >
              <span className="gold-line" />
              <span className="t-label">04 · Fiyatlandırma</span>
              <span className="gold-line" />
            </div>

            <h2
              className="t-display"
              style={{ color: "var(--ink)", marginBottom: "var(--space-xl)" }}
            >
              Satışınız arttıkça{" "}
              <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                kendini öder
              </em>
            </h2>

            {/* Billing toggle */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-md)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-small)",
                  color: yearly ? "var(--dim)" : "var(--ink)",
                  fontWeight: 500,
                }}
              >
                Aylık
              </span>

              <button
                onClick={() => setYearly(!yearly)}
                aria-label="Yıllık/aylık fiyatlandırma"
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 999,
                  background: yearly ? "var(--ocean)" : "var(--dune)",
                  border: "none",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background var(--duration-base)",
                  flexShrink: 0,
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
                    fontSize: "var(--t-small)",
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
                    fontSize: "var(--t-label)",
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
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: "var(--space-lg)", alignItems: "center" }}
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
            marginTop: "var(--space-xl)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            color: "var(--dim)",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
          }}
        >
          14 gün ücretsiz · Kredi kartı gerekmez · İstediğinde iptal
        </motion.p>
      </div>
    </section>
  );
}
