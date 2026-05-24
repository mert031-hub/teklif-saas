// Server Component — NO 'use client' needed.
// All hover effects via CSS classes. Zero JS event handlers.

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--ivory)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl)",
        textAlign: "center",
      }}
    >
      {/* Ghost number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 20vw, 14rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(26,26,46,0.1)",
          lineHeight: 0.85,
          marginBottom: "var(--space-2xl)",
          userSelect: "none",
        }}
      >
        404
      </div>

      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: "var(--space-lg)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 40,
            height: 1,
            background: "var(--gold)",
          }}
        />
        <span className="t-label">Sayfa Bulunamadı</span>
        <span
          style={{
            display: "inline-block",
            width: 40,
            height: 1,
            background: "var(--gold)",
          }}
        />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-title)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: "var(--space-md)",
        }}
      >
        Bu sayfa mevcut değil
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          color: "var(--muted)",
          lineHeight: 1.7,
          maxWidth: 400,
          marginBottom: "var(--space-2xl)",
        }}
      >
        Aradığınız sayfa kaldırılmış, taşınmış veya hiç var olmamış olabilir.
      </p>

      {/* CSS class buttons — zero JS handlers */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-md)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/" className="btn-primary">
          Ana Sayfaya Dön
        </Link>
        <Link href="/dashboard" className="btn-outline">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
