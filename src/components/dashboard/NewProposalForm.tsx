"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Props {
  agencyId: string;
  userId: string;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 55) +
    "-" +
    Date.now().toString(36)
  );
}

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
const focusStyle = (
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  e.currentTarget.style.borderColor = "var(--ocean)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(27,79,114,0.08)";
};
const blurStyle = (
  e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
) => {
  e.currentTarget.style.borderColor = "var(--border)";
  e.currentTarget.style.boxShadow = "none";
};

export function NewProposalForm({ agencyId, userId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    validUntil: "",
    basePrice: "",
    currency: "TRY",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Teklif adı zorunludur.");
    setError(null);

    startTransition(async () => {
      const supabase = createClient();

      const { data, error: err } = await supabase
        .from("proposals")
        .insert({
          agency_id: agencyId,
          created_by: userId,
          title: form.title.trim(),
          slug: slugify(form.title),
          status: "draft",
          customer_name: form.customerName.trim() || null,
          customer_email: form.customerEmail.trim() || null,
          customer_phone: form.customerPhone.trim() || null,
          valid_until: form.validUntil || null,
          base_price: form.basePrice ? Number(form.basePrice) : 0,
          currency: form.currency,
          blocks: [],
          theme: { primaryColor: "#1B4F72" },
        })
        .select()
        .single();

      if (err || !data) {
        setError(err?.message || "Teklif oluşturulamadı.");
        return;
      }

      router.push(`/dashboard/proposals/${data.id}/edit`);
    });
  };

  return (
    <div
      style={{ maxWidth: 600, margin: "0 auto", paddingTop: "var(--space-md)" }}
    >
      {/* Back link */}
      <Link
        href="/dashboard/proposals"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-small)",
          color: "var(--muted)",
          textDecoration: "none",
          marginBottom: "var(--space-xl)",
          transition: "color var(--duration-fast)",
        }}
        className="nav-link"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M9 11L5 7L9 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        Tekliflere dön
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--t-title)",
          fontWeight: 300,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          lineHeight: 1.1,
          marginBottom: "var(--space-2xl)",
        }}
      >
        Yeni teklif{" "}
        <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>oluştur</em>
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "white",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 12px rgba(26,26,46,0.06)",
          overflow: "hidden",
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Teklif bilgileri */}
          <div
            style={{
              padding: "var(--space-xl)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "var(--space-lg)",
              }}
            >
              Teklif Bilgileri
            </div>

            <div
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
                  Teklif Adı <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Örn: Ahmet Bey — Maldivler Teklifi"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

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
                    Baz Fiyat
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.basePrice}
                    onChange={(e) => set("basePrice", e.target.value)}
                    placeholder="0"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
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
                    Para Birimi
                  </label>
                  <select
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  >
                    <option value="TRY">₺ TRY</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
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
                  Geçerlilik Tarihi
                </label>
                <input
                  type="date"
                  value={form.validUntil}
                  onChange={(e) => set("validUntil", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>
            </div>
          </div>

          {/* Müşteri bilgileri */}
          <div
            style={{
              padding: "var(--space-xl)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-label)",
                color: "var(--muted)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "var(--space-lg)",
              }}
            >
              Müşteri Bilgileri{" "}
              <span style={{ color: "var(--dim)" }}>(opsiyonel)</span>
            </div>

            <div
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
                  type="text"
                  value={form.customerName}
                  onChange={(e) => set("customerName", e.target.value)}
                  placeholder="Ahmet Yılmaz"
                  style={inputStyle}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
              </div>

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
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={form.customerEmail}
                    onChange={(e) => set("customerEmail", e.target.value)}
                    placeholder="ahmet@mail.com"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
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
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) => set("customerPhone", e.target.value)}
                    placeholder="+90 532 000 00 00"
                    style={inputStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "var(--space-lg) var(--space-xl)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "var(--space-md)",
            }}
          >
            {error && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-small)",
                  color: "#dc2626",
                }}
              >
                {error}
              </motion.span>
            )}
            {!error && <div />}

            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              <Link
                href="/dashboard"
                className="btn-outline"
                style={{ minHeight: "unset", minWidth: "unset" }}
              >
                İptal
              </Link>
              <button
                type="submit"
                disabled={isPending || !form.title.trim()}
                className="btn-primary"
                style={{
                  opacity: isPending || !form.title.trim() ? 0.6 : 1,
                  cursor:
                    isPending || !form.title.trim() ? "not-allowed" : "pointer",
                  minHeight: "unset",
                  minWidth: "unset",
                }}
              >
                {isPending ? "Oluşturuluyor..." : "Editöre Geç →"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
