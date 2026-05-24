// Footer — no 'use client' needed.
// Hover effects via CSS classes (no onMouseEnter/Leave).
// Motion.div removed — static footer is correct here.

import Link from "next/link";

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

            {/* Social — CSS hover via .social-icon class */}
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              {[
                { s: "X", href: "#" },
                { s: "in", href: "#" },
                { s: "ig", href: "#" },
              ].map(({ s, href }) => (
                <a key={s} href={href} className="social-icon">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — CSS hover via .footer-link class */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--t-label)",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
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
                    <Link href={item.href} className="footer-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline" style={{ marginBottom: "var(--space-lg)" }} />

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

        {/* Ghost wordmark */}
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
