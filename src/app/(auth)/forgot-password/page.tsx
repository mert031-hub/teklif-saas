"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) return setError(error.message);
      setSent(true);
    });
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--ivory)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl) var(--space-lg)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "var(--space-3xl)",
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

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: "var(--radius-xl)",
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 24px rgba(26,26,46,0.06)",
        }}
      >
        {sent ? (
          /* ── Success state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(107,143,113,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto var(--space-lg)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z"
                  stroke="var(--sage)"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 6L12 13L22 6"
                  stroke="var(--sage)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--t-title)",
                fontWeight: 300,
                color: "var(--ink)",
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-sm)",
              }}
            >
              E-posta gönderildi
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-body)",
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: "var(--space-xl)",
              }}
            >
              <strong style={{ color: "var(--ink)" }}>{email}</strong> adresine
              şifre sıfırlama bağlantısı gönderdik. Spam klasörünü de kontrol
              edin.
            </p>
            <Link
              href="/login"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Giriş Sayfasına Dön
            </Link>
          </motion.div>
        ) : (
          /* ── Form state ── */
          <>
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
                Şifremi{" "}
                <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                  sıfırla
                </em>
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-body)",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                E-posta adresinizi girin, sıfırlama bağlantısı gönderelim.
              </p>
            </div>

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
                  E-posta adresi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="siz@acente.com"
                  autoComplete="email"
                  className="form-input"
                />
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
                disabled={isPending || !email.trim()}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  opacity: isPending || !email.trim() ? 0.6 : 1,
                  cursor:
                    isPending || !email.trim() ? "not-allowed" : "pointer",
                }}
              >
                {isPending ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
              </button>
            </form>
          </>
        )}
      </motion.div>

      <p
        style={{
          marginTop: "var(--space-xl)",
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-small)",
          color: "var(--muted)",
        }}
      >
        <Link
          href="/login"
          style={{
            color: "var(--ocean)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← Giriş sayfasına dön
        </Link>
      </p>
    </div>
  );
}
