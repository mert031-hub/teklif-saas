"use client";

import { useState, useTransition, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    // Supabase sends the user back with a hash — exchange it for a session
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setSessionReady(true);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8)
      return setError("Şifre en az 8 karakter olmalıdır.");
    if (password !== confirm) return setError("Şifreler eşleşmiyor.");

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) return setError(error.message);
      setDone(true);
      setTimeout(() => router.push("/dashboard"), 2500);
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
        {done ? (
          /* ── Success ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(27,79,114,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto var(--space-lg)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--ocean)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3.5 9L7.5 13L14.5 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
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
              Şifre güncellendi
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-body)",
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              Dashboard'a yönlendiriliyorsunuz...
            </p>
          </motion.div>
        ) : (
          /* ── Form ── */
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
                Yeni şifre{" "}
                <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
                  belirle
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
                En az 8 karakter, güvenli bir şifre seçin.
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
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="En az 8 karakter"
                  autoComplete="new-password"
                  className="form-input"
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
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="form-input"
                />
                {/* Strength indicator */}
                {password.length > 0 && (
                  <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 3,
                          borderRadius: 2,
                          background:
                            password.length >= i * 3
                              ? i <= 2
                                ? "#ef4444"
                                : i === 3
                                  ? "var(--gold)"
                                  : "var(--sage)"
                              : "var(--dune)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                )}
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
                disabled={isPending || !sessionReady || password.length < 8}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  opacity:
                    isPending || !sessionReady || password.length < 8 ? 0.6 : 1,
                  cursor:
                    isPending || !sessionReady || password.length < 8
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isPending ? "Kaydediliyor..." : "Şifreyi Güncelle"}
              </button>

              {!sessionReady && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--t-label)",
                    color: "var(--muted)",
                    textAlign: "center",
                  }}
                >
                  Bağlantı doğrulanıyor...
                </p>
              )}
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
