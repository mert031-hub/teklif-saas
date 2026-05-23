"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth/actions";

/* ─────────────────────────────────────────
   LEFT PANEL
   Desktop: 55% width, full height
   Tablet:  compact top strip (120px)
   Mobile:  hidden
───────────────────────────────────────── */
function LeftPanel() {
  return (
    <>
      {/* Desktop / Tablet left panel */}
      <div
        className="hidden md:flex"
        style={{
          position: "relative",
          background:
            "linear-gradient(160deg, #1B4F72 0%, #154360 40%, #0E2F44 100%)",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(1.5rem, 3vw, 3rem)",
          overflow: "hidden",
          minHeight: "100vh",
        }}
      >
        {/* Atmospheric blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "70vmin",
            height: "70vmin",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(91,164,207,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "50vmin",
            height: "50vmin",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)",
            filter: "blur(70px)",
            pointerEvents: "none",
          }}
        />
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.2)",
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
              color: "rgba(255,255,255,0.9)",
            }}
          >
            TeklifAI
          </span>
        </Link>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "rgba(201,169,110,0.7)",
              marginBottom: "1.5rem",
            }}
          />
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 2.5vw, 2.8rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
              maxWidth: 420,
            }}
          >
            "Müşteriniz teklifi açtığında, siz zaten satmış olmalısınız."
          </blockquote>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.04em",
            }}
          >
            TeklifAI — Seyahat Satışının Geleceği
          </p>
        </motion.div>

        {/* Stats */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            gap: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {[
            { value: "3.2×", label: "Daha fazla satış" },
            { value: "%94", label: "Memnuniyet" },
            { value: "500+", label: "Aktif acente" },
          ].map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile top bar — brand only */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1rem 1.5rem",
          background: "rgba(250,248,244,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              background: "var(--ocean)",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            TeklifAI
          </span>
        </Link>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────── */
function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signInWithEmail(formData);
      if (result?.error) setError(result.error);
    });
  };

  const handleGoogle = () => {
    startTransition(async () => {
      await signInWithGoogle();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "clamp(5rem, 5vw, 3rem) clamp(1.25rem, 5vw, 3rem)",
        background: "var(--ivory)",
        overflowY: "auto",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(1.5rem, 4vw, 2.5rem)" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            Hoş geldiniz
            <br />
            <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
              tekrar
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.82rem, 2vw, 0.9rem)",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            Hesabınıza giriş yapın ve tekliflerinizi yönetin.
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={isPending}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "clamp(10px, 2vw, 13px) 20px",
            borderRadius: 12,
            background: "white",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.82rem, 2vw, 0.9rem)",
            fontWeight: 500,
            color: "var(--ink)",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(26,26,46,0.06)",
            transition: "all 0.2s ease",
            marginBottom: "1.25rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,26,46,0.1)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 4px rgba(26,26,46,0.06)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
              fill="#34A853"
            />
            <path
              d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          Google ile Devam Et
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.25rem",
          }}
        >
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--dim)",
              letterSpacing: "0.1em",
            }}
          >
            VEYA
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--ink-soft)",
                marginBottom: "0.45rem",
              }}
            >
              E-posta adresi
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="siz@acente.com"
              autoComplete="email"
              style={{
                width: "100%",
                padding: "clamp(10px, 2vw, 12px) 16px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "white",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--ocean)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(27,79,114,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Password */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.45rem",
              }}
            >
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--ink-soft)",
                }}
              >
                Şifre
              </label>
              <Link
                href="/forgot-password"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--ocean)",
                  textDecoration: "none",
                }}
              >
                Şifremi unuttum
              </Link>
            </div>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "clamp(10px, 2vw, 12px) 16px",
                border: "1px solid var(--border)",
                borderRadius: 10,
                background: "white",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--ocean)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(27,79,114,0.08)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.2)",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                color: "#dc2626",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: "100%",
              padding: "clamp(12px, 2vw, 14px)",
              borderRadius: 10,
              border: "none",
              background: isPending ? "rgba(27,79,114,0.6)" : "var(--ocean)",
              color: "white",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.85rem, 2vw, 0.9rem)",
              fontWeight: 600,
              cursor: isPending ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: isPending ? "none" : "0 4px 16px rgba(27,79,114,0.2)",
            }}
            onMouseEnter={(e) => {
              if (!isPending) {
                e.currentTarget.style.background = "#154360";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(27,79,114,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isPending
                ? "rgba(27,79,114,0.6)"
                : "var(--ocean)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = isPending
                ? "none"
                : "0 4px 16px rgba(27,79,114,0.2)";
            }}
          >
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Register link */}
        <p
          style={{
            textAlign: "center",
            marginTop: "1.75rem",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.8rem, 2vw, 0.85rem)",
            color: "var(--muted)",
          }}
        >
          Hesabınız yok mu?{" "}
          <Link
            href="/register"
            style={{
              color: "var(--ocean)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ücretsiz başlayın
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
   Desktop:  grid 55/45
   Tablet:   grid 45/55 (panel shrinks)
   Mobile:   single column (panel hidden)
───────────────────────────────────────── */
export default function LoginPage() {
  return (
    <>
      {/* Responsive grid via Tailwind */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[45%_55%] lg:grid-cols-[55%_45%]">
        <LeftPanel />
        <LoginForm />
      </div>
    </>
  );
}
