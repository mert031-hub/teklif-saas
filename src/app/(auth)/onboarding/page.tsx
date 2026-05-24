"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/* ─── Types ─── */
interface OnboardingData {
  agencyName: string;
  agencySlug: string;
  phone: string;
  website: string;
  brandColor: string;
  city: string;
}

/* ─── Constants ─── */
const BRAND_COLORS = [
  { label: "Okyanus", value: "#1B4F72" },
  { label: "Sage", value: "#4A7C6B" },
  { label: "Terra", value: "#7D4E2D" },
  { label: "Gold", value: "#B8860B" },
  { label: "Slate", value: "#2C3E50" },
  { label: "Burgundy", value: "#6B2737" },
];

/* ─── Validation ─── */
function sanitize(val: string): string {
  return val
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"`;]/g, "")
    .trim();
}

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{0,58}[a-z0-9]$|^[a-z0-9]$/;
const PHONE_REGEX = /^[\+]?[\d\s\-\(\)]{7,20}$/;

function validateStep1(d: OnboardingData): string | null {
  const name = sanitize(d.agencyName);
  if (!name || name.length < 2) return "Acente adı en az 2 karakter olmalıdır.";
  if (name.length > 100) return "Acente adı en fazla 100 karakter olabilir.";
  if (!d.agencySlug) return "Teklif URL'i boş bırakılamaz.";
  if (!SLUG_REGEX.test(d.agencySlug))
    return "URL yalnızca küçük harf, rakam ve tire içerebilir.";
  if (d.phone && !PHONE_REGEX.test(d.phone))
    return "Geçerli bir telefon numarası girin.";
  if (d.website && !/^https?:\/\/.+/.test(d.website))
    return "Web sitesi http:// veya https:// ile başlamalıdır.";
  return null;
}

/* ─── Shared input styles ─── */
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

/* ─── Step indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-xs)",
        marginBottom: "var(--space-2xl)",
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-xs)",
          }}
        >
          <motion.div
            animate={{
              width: i === current ? 28 : 10,
              background: i <= current ? "var(--ocean)" : "var(--dune)",
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 10, borderRadius: 999 }}
          />
          {i < total - 1 && (
            <div
              style={{
                height: 1,
                width: 20,
                flexShrink: 0,
                background: i < current ? "var(--ocean)" : "var(--dune)",
                transition: "background 0.3s",
              }}
            />
          )}
        </div>
      ))}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--t-label)",
          color: "var(--muted)",
          letterSpacing: "0.12em",
          marginLeft: "var(--space-xs)",
        }}
      >
        {current + 1} / {total}
      </span>
    </div>
  );
}

/* ─── Inline error banner ─── */
function ErrorBanner({ message }: { message: string }) {
  return (
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
        marginTop: "var(--space-md)",
      }}
    >
      {message}
    </motion.div>
  );
}

/* ════════════════════════
   STEP 1 — Agency info
   ════════════════════════ */
function Step1({
  data,
  onChange,
  onNext,
}: {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (v: string) => {
    const clean = sanitize(v);
    const slug = clean
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    onChange({ agencyName: clean, agencySlug: slug });
    setError(null);
  };

  const handleNext = () => {
    const err = validateStep1(data);
    if (err) {
      setError(err);
      return;
    }
    onNext();
  };

  const isValid = data.agencyName.trim().length >= 2;

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
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
        Acentenizi tanıyalım
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          color: "var(--muted)",
          marginBottom: "var(--space-xl)",
          lineHeight: 1.7,
        }}
      >
        Bu bilgiler tekliflerinizde müşterilerinize gösterilecek.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
        }}
      >
        {/* Agency name */}
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
            Acente Adı <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <input
            type="text"
            value={data.agencyName}
            required
            placeholder="Örn: Mavi Deniz Turizm"
            onChange={(e) => handleNameChange(e.target.value)}
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        {/* Slug */}
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
            Teklif URL'i
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            >
              teklifai.com/
            </span>
            <input
              type="text"
              value={data.agencySlug}
              onChange={(e) =>
                onChange({
                  agencySlug: e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, "")
                    .replace(/^-+/, ""),
                })
              }
              style={{ ...inputStyle, paddingLeft: 112 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>

        {/* City + Phone */}
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
              Şehir
            </label>
            <input
              type="text"
              value={data.city}
              placeholder="İstanbul"
              onChange={(e) => onChange({ city: sanitize(e.target.value) })}
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
              Telefon
            </label>
            <input
              type="tel"
              value={data.phone}
              placeholder="+90 532 000 00 00"
              onChange={(e) => onChange({ phone: e.target.value })}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>

        {/* Website */}
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
            Web Sitesi
          </label>
          <input
            type="url"
            value={data.website}
            placeholder="https://acenteniz.com"
            onChange={(e) => onChange({ website: e.target.value })}
            style={inputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="btn-primary"
        style={{
          marginTop: "var(--space-xl)",
          width: "100%",
          justifyContent: "center",
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? "pointer" : "not-allowed",
        }}
      >
        Devam Et →
      </button>
    </motion.div>
  );
}

/* ════════════════════════
   STEP 2 — Brand color
   ════════════════════════ */
function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: OnboardingData;
  onChange: (d: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2
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
        Markanızın rengi
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          color: "var(--muted)",
          marginBottom: "var(--space-xl)",
          lineHeight: 1.7,
        }}
      >
        Müşteri teklif sayfalarında kullanılacak. Sonradan değiştirebilirsiniz.
      </p>

      {/* Color presets */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        {BRAND_COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => onChange({ brandColor: color.value })}
            style={{
              padding: "var(--space-md)",
              borderRadius: "var(--radius-md)",
              border: `2px solid ${data.brandColor === color.value ? color.value : "var(--border)"}`,
              background: "white",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              boxShadow:
                data.brandColor === color.value
                  ? `0 4px 20px ${color.value}30`
                  : "0 1px 4px rgba(26,26,46,0.06)",
              transition: "all var(--duration-fast)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: color.value,
                boxShadow: `0 4px 12px ${color.value}40`,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-label)",
                fontWeight: 500,
                color: "var(--ink-soft)",
              }}
            >
              {color.label}
            </span>
          </button>
        ))}
      </div>

      {/* Custom color picker */}
      <div style={{ marginBottom: "var(--space-lg)" }}>
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
          Özel renk
        </label>
        <div
          style={{
            display: "flex",
            gap: "var(--space-sm)",
            alignItems: "center",
          }}
        >
          <input
            type="color"
            value={data.brandColor}
            onChange={(e) => onChange({ brandColor: e.target.value })}
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              padding: 4,
              cursor: "pointer",
              background: "white",
            }}
          />
          <div
            style={{
              flex: 1,
              padding: "clamp(10px, 2vw, 12px) 14px",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              background: "white",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: data.brandColor,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--t-small)",
                color: "var(--ink)",
              }}
            >
              {data.brandColor.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Live preview */}
      <div
        style={{
          padding: "var(--space-lg)",
          borderRadius: "var(--radius-md)",
          background: "var(--sand)",
          border: "1px solid var(--border)",
          marginBottom: "var(--space-xl)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--t-label)",
            color: "var(--muted)",
            marginBottom: "var(--space-md)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          Teklif önizlemesi
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "var(--space-sm)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: data.brandColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "white", fontSize: "0.75rem", fontWeight: 700 }}
            >
              {data.agencyName.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            {data.agencyName || "Acente Adınız"}
          </span>
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            display: "inline-flex",
            background: data.brandColor,
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-small)",
            fontWeight: 600,
          }}
        >
          Teklifi İncele
        </div>
      </div>

      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        <button
          onClick={onBack}
          className="btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
        >
          ← Geri
        </button>
        <button
          onClick={onNext}
          className="btn-primary"
          style={{ flex: 2, justifyContent: "center" }}
        >
          Devam Et →
        </button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════
   STEP 3 — Summary
   ════════════════════════ */
function Step3({
  data,
  onComplete,
  onBack,
  isPending,
  completeError,
}: {
  data: OnboardingData;
  onComplete: () => void;
  onBack: () => void;
  isPending: boolean;
  completeError: string | null;
}) {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(27,79,114,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-lg)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--ocean)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M3.5 10L8 14.5L16.5 6"
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
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          lineHeight: 1.1,
          marginBottom: "var(--space-sm)",
        }}
      >
        Her şey hazır,
        <br />
        <em style={{ fontStyle: "italic", color: "var(--ocean)" }}>
          başlayalım
        </em>
      </h2>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--t-body)",
          color: "var(--muted)",
          marginBottom: "var(--space-xl)",
          lineHeight: 1.7,
        }}
      >
        Hesabınız oluşturuldu. İşte kurduklarınız:
      </p>

      {/* Summary card */}
      <div
        style={{
          padding: "var(--space-lg)",
          borderRadius: "var(--radius-lg)",
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 12px rgba(26,26,46,0.06)",
          marginBottom: "var(--space-xl)",
        }}
      >
        {[
          { label: "Acente Adı", value: data.agencyName, isColor: false },
          {
            label: "Teklif URL",
            value: `teklifai.com/${data.agencySlug}`,
            isColor: false,
          },
          { label: "Şehir", value: data.city || "—", isColor: false },
          { label: "Marka Rengi", value: data.brandColor, isColor: true },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--space-sm) 0",
              borderBottom: i < 3 ? "1px solid var(--border-soft)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                color: "var(--muted)",
              }}
            >
              {row.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {row.isColor && (
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: row.value,
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--t-small)",
                  fontWeight: 500,
                  color: "var(--ink)",
                }}
              >
                {row.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Error */}
      {completeError && <ErrorBanner message={completeError} />}

      <div
        style={{
          display: "flex",
          gap: "var(--space-sm)",
          marginTop: completeError ? "var(--space-md)" : 0,
        }}
      >
        <button
          onClick={onBack}
          disabled={isPending}
          className="btn-outline"
          style={{ flex: 1, justifyContent: "center" }}
        >
          ← Geri
        </button>
        <button
          onClick={onComplete}
          disabled={isPending}
          className="btn-primary"
          style={{
            flex: 2,
            justifyContent: "center",
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Oluşturuluyor..." : "Dashboard'a Git →"}
        </button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════
   PAGE
   ════════════════════════ */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [data, setData] = useState<OnboardingData>({
    agencyName: "",
    agencySlug: "",
    phone: "",
    website: "",
    brandColor: "#1B4F72",
    city: "",
  });

  const update = (d: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...d }));

  const handleComplete = () => {
    setCompleteError(null);
    startTransition(async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCompleteError("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        return;
      }

      // Check slug uniqueness before insert
      let slug = data.agencySlug;
      const { data: existing } = await supabase
        .from("agencies")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (existing) {
        slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
      }

      const { data: agency, error: agencyError } = await supabase
        .from("agencies")
        .insert({
          name: data.agencyName.trim(),
          slug,
          phone: data.phone.trim() || null,
          website: data.website.trim() || null,
          brand_color: data.brandColor,
          address: data.city.trim() || null,
          owner_id: user.id,
        })
        .select()
        .single();

      if (agencyError) {
        setCompleteError(
          agencyError.code === "23505"
            ? "Bu acente URL'i zaten kullanımda. Geri dönüp farklı bir isim deneyin."
            : `Hata: ${agencyError.message || agencyError.code}`,
        );
        return;
      }

      if (!agency) {
        setCompleteError("Acente verisi alınamadı. Lütfen tekrar deneyin.");
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        agency_id: agency.id,
        full_name: user.user_metadata?.full_name || "",
        role: "owner",
      });

      if (profileError) {
        setCompleteError(`Profil oluşturulamadı: ${profileError.message}`);
        return;
      }

      router.push("/dashboard");
    });
  };

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "var(--ivory)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-xl) var(--space-lg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "var(--container-xs)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "var(--space-xl)",
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
          </div>
          <StepIndicator current={step} total={3} />
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.25rem, 4vw, 2.5rem)",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 24px rgba(26,26,46,0.06)",
          }}
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <Step1
                key="s1"
                data={data}
                onChange={update}
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <Step2
                key="s2"
                data={data}
                onChange={update}
                onNext={() => setStep(2)}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <Step3
                key="s3"
                data={data}
                onComplete={handleComplete}
                onBack={() => setStep(1)}
                isPending={isPending}
                completeError={completeError}
              />
            )}
          </AnimatePresence>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "var(--space-lg)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-label)",
            color: "var(--dim)",
          }}
        >
          Yardım için:{" "}
          <a
            href="mailto:destek@teklifai.com"
            style={{ color: "var(--ocean)", textDecoration: "none" }}
          >
            destek@teklifai.com
          </a>
        </p>
      </div>
    </div>
  );
}
