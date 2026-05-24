// Server Component — NO 'use client' needed.
// Ocean blue theme for proposal-specific 404.
// Zero JS event handlers — CSS class buttons only.

import Link from "next/link";

export default function ProposalNotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(160deg, #1B4F72 0%, #0E2F44 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Static atmospheric blob — no animation, server-safe */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "60vmax",
          height: "60vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,164,207,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Ghost number */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6rem, 20vw, 12rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.12)",
          lineHeight: 0.85,
          marginBottom: "var(--space-2xl)",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        404
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: "var(--space-lg)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "rgba(201,169,110,0.5)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--t-label)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Teklif Bulunamadı
          </span>
          <span
            style={{
              display: "inline-block",
              width: 40,
              height: 1,
              background: "rgba(201,169,110,0.5)",
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--t-title)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "white",
            marginBottom: "var(--space-md)",
          }}
        >
          Bu teklif artık mevcut değil
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-body)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: 400,
            marginBottom: "var(--space-2xl)",
          }}
        >
          Teklif silinmiş, süresi dolmuş veya henüz yayınlanmamış olabilir.
          Lütfen acentenizle iletişime geçin.
        </p>

        {/* btn-white — CSS class, zero JS handlers */}
        <Link href="/" className="btn-white" style={{ color: "var(--ocean)" }}>
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}
