"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = {
  Ürün: [
    { label: "Özellikler", href: "#features" },
    { label: "Nasıl Çalışır", href: "#how-it-works" },
    { label: "Fiyatlar", href: "#pricing" },
    { label: "Güvenlik", href: "#" },
  ],
  Şirket: [
    { label: "Hakkımızda", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Kariyer", href: "#" },
    { label: "İletişim", href: "#" },
  ],
  Destek: [
    { label: "Dokümantasyon", href: "#" },
    { label: "API Referansı", href: "#" },
    { label: "Durum Sayfası", href: "#" },
    { label: "SSS", href: "#" },
  ],
  Yasal: [
    { label: "Gizlilik", href: "#" },
    { label: "Kullanım Koşulları", href: "#" },
    { label: "KVKK", href: "#" },
    { label: "Çerezler", href: "#" },
  ],
};

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover-underline"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--t-small)",
        color: "var(--ink-soft)",
        textDecoration: "none",
        transition: "color var(--duration-fast)",
        display: "block",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ocean)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-soft)")}
    >
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--sand)",
        borderTop: "1px solid var(--border)",
        paddingTop: "var(--space-3xl)",
        paddingBottom: "var(--space-xl)",
      }}
    >
      <div className="container">
        {/* Top grid:
            Mobile:  1 col (brand + links stacked)
            Tablet:  2 col (brand | 2×2 link grid)
            Desktop: 5 col (brand | 4 link cols)
        */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          style={{ gap: "var(--space-2xl)", marginBottom: "var(--space-3xl)" }}
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: "var(--space-md)",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--ocean)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L14 6V10L8 14L2 10V6L8 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--ink)",
                }}
              >
                TeklifAI
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                color: "var(--muted)",
                lineHeight: 1.75,
                maxWidth: 220,
                marginBottom: "var(--space-lg)",
              }}
            >
              Turizm acenteleri için yeni nesil interaktif teklif platformu.
            </p>
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              {["X", "in", "ig"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-label)",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "all var(--duration-fast)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--ocean)";
                    e.currentTarget.style.color = "var(--ocean)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols — 2×2 on tablet, each its own col on desktop */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-label)",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  marginBottom: "var(--space-md)",
                }}
              >
                {category}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-sm)",
                }}
              >
                {items.map((item) => (
                  <li key={item.label}>
                    <FooterLink href={item.href} label={item.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hairline" style={{ marginBottom: "var(--space-lg)" }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "var(--space-md)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-label)",
              color: "var(--dim)",
            }}
          >
            © 2026 TeklifAI · İstanbul, Türkiye
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--sage)",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--dim)",
              }}
            >
              Tüm Sistemler Çalışıyor
            </span>
          </div>
        </div>

        {/* Big wordmark — scales with viewport */}
        <div
          style={{
            marginTop: "var(--space-2xl)",
            overflow: "hidden",
            lineHeight: 0.8,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 18vw, 16rem)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(26,26,46,0.08)",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            TeklifAI
          </div>
        </div>
      </div>
    </footer>
  );
}
