"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "@/lib/auth/actions";

/* ─── Shared input style using design tokens ─── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "clamp(10px, 2vw, 12px) 14px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  background: "white",
  fontFamily: "var(--font-body)",
  fontSize: "var(--t-small)",
  color: "var(--ink)",
  outline: "none",
  transition:
    "border-color var(--duration-fast), box-shadow var(--duration-fast)",
};

const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "var(--ocean)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(27,79,114,0.08)";
};
const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = "var(--border)";
  e.currentTarget.style.boxShadow = "none";
};

/* ─── Right decorative panel ─── */
function RightPanel() {
  return (
    <div
      className="hidden md:flex"
      style={{
        position: "relative",
        background:
          "linear-gradient(160deg, #0E2F44 0%, #154360 50%, #1B4F72 100%)",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 3vw, 3rem)",
        overflow: "hidden",
        minHeight: "100svh",
      }}
    >
      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "-30%",
          left: "-15%",
          width: "75vmin",
          height: "75vmin",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 70%)",
          filter: "blur(65px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
        style={{
          position: "absolute",
          bottom: "0%",
          right: "-10%",
          width: "55vmin",
          height: "55vmin",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,164,207,0.3) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
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

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(201,169,110,0.7)",
            marginBottom: "var(--space-xl)",
          }}
        />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 2.5vw, 2.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "var(--space-2xl)",
          }}
        >
          14 gün ücretsiz,
          <br />
          sonrası tamamen size bağlı.
        </h2>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
          }}
        >
          {[
            "Kredi kartı gerekmez",
            "Anında kurulum — 5 dakika",
            "Sınırsız teklif oluşturma",
            "Gerçek zamanlı analitik",
            "WhatsApp & e-posta paylaşım",
            "İstediğiniz zaman iptal",
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "rgba(201,169,110,0.2)",
                  border: "1px solid rgba(201,169,110,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="rgba(201,169,110,0.9)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-small)",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Quote */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "var(--space-xl)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
          }}
        >
          "İlk teklifimizi gönderdikten sonra müşteri 20 dakika içinde aradı."
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-label)",
            color: "rgba(255,255,255,0.3)",
            marginTop: "var(--space-sm)",
          }}
        >
          — Setur Antalya şubesi
        </p>
      </div>
    </div>
  );
}

/* ─── Register form ─── */
function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      return setError("Şifreler eşleşmiyor.");
    }
    startTransition(async () => {
      const result = await signUpWithEmail(formData);
      if (result?.error) setError(result.error);
    });
  };

  const handleGoogle = () =>
    startTransition(async () => {
      await signInWithGoogle();
    });

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "var(--space-md) var(--space-lg)",
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

      {/* Form area */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100svh",
          padding: "clamp(5rem, 8vw, 3rem) clamp(1.25rem, 5vw, 3rem)",
          background: "var(--ivory)",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: "var(--space-xl)" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-title)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                lineHeight: 1.1,
                marginBottom: "var(--space-sm)",
              }}
            >
              Hesap oluşturun,
              <br />
              <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                hemen başlayın
              </em>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              14 gün ücretsiz. Kredi kartı gerekmez.
            </p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={isPending}
            className="inline-link"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "clamp(10px, 2vw, 13px) 20px",
              borderRadius: "var(--radius-md)",
              background: "white",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              fontWeight: 500,
              color: "var(--ink)",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(26,26,46,0.06)",
              transition: "all var(--duration-base) var(--ease-in-out)",
              marginBottom: "var(--space-lg)",
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
            Google ile Kayıt Ol
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
              marginBottom: "var(--space-lg)",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-md)",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--ink-soft)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                Ad Soyad
              </label>
              <input
                name="fullName"
                type="text"
                required
                placeholder="Ahmet Yılmaz"
                autoComplete="name"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--ink-soft)",
                  marginBottom: "var(--space-xs)",
                }}
              >
                E-posta
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="siz@acente.com"
                autoComplete="email"
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>

            {/* Password row — responsive grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: "var(--space-sm)" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--ink-soft)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Şifre
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  placeholder="En az 8 karakter"
                  autoComplete="new-password"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--ink-soft)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  Şifre Tekrar
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  autoComplete="new-password"
                  style={inputStyle}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "var(--space-sm) var(--space-md)",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(239,68,68,0.06)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-small)",
                  color: "#dc2626",
                }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                width: "100%",
                padding: "clamp(12px, 2vw, 14px)",
                borderRadius: "var(--radius-md)",
                border: "none",
                background: isPending ? "rgba(27,79,114,0.6)" : "var(--ocean)",
                color: "white",
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                fontWeight: 600,
                cursor: isPending ? "not-allowed" : "pointer",
                transition: "all var(--duration-base) var(--ease-in-out)",
                boxShadow: isPending
                  ? "none"
                  : "0 4px 16px rgba(27,79,114,0.2)",
              }}
              onMouseEnter={(e) => {
                if (!isPending) {
                  e.currentTarget.style.background = "#154360";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isPending
                  ? "rgba(27,79,114,0.6)"
                  : "var(--ocean)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isPending
                ? "Hesap oluşturuluyor..."
                : "Hesap Oluştur — Ücretsiz"}
            </button>

            <p
              style={{
                textAlign: "center",
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-label)",
                color: "var(--dim)",
                lineHeight: 1.6,
              }}
            >
              Kayıt olarak{" "}
              <Link
                href="/terms"
                style={{ color: "var(--ocean)", textDecoration: "none" }}
              >
                Kullanım Koşulları
              </Link>{" "}
              ve{" "}
              <Link
                href="/privacy"
                style={{ color: "var(--ocean)", textDecoration: "none" }}
              >
                Gizlilik Politikası
              </Link>
              'nı kabul etmiş olursunuz.
            </p>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "var(--space-xl)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-small)",
              color: "var(--muted)",
            }}
          >
            Zaten hesabınız var mı?{" "}
            <Link
              href="/login"
              style={{
                color: "var(--ocean)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Giriş yapın
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <div className="auth-layout">
      <RegisterForm />
      <RightPanel />
    </div>
  );
}
