"use client";

import { useTransition } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "@/lib/store/builder";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { createClient } from "@/lib/supabase/client";

export function BuilderNav() {
  const {
    proposal,
    isDirty,
    isSaving,
    previewMode,
    setPreviewMode,
    setSaving,
  } = useBuilderStore();
  const isMobile = useBreakpoint("sm");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!proposal || !isDirty) return;
    setSaving(true);
    startTransition(async () => {
      const supabase = createClient();
      await supabase
        .from("proposals")
        .update({
          blocks: proposal.blocks,
          theme: proposal.theme,
          title: proposal.title,
          updated_at: new Date().toISOString(),
        })
        .eq("id", proposal.id);
      setSaving(false);
    });
  };

  const handleShare = () => {
    if (!proposal?.slug) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/p/${proposal.slug}`,
    );
  };

  return (
    <div
      style={{
        height: isMobile ? 52 : 56,
        borderBottom: "1px solid var(--border)",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 var(--space-${isMobile ? "md" : "lg"})`,
        flexShrink: 0,
        zIndex: 50,
        gap: "var(--space-sm)",
      }}
    >
      {/* Left: back + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          minWidth: 0,
          flex: 1,
        }}
      >
        <Link
          href="/dashboard"
          className="icon-btn"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            flexShrink: 0,
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 11L5 7L9 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {!isMobile && (
          <>
            <div
              style={{
                width: 1,
                height: 20,
                background: "var(--border)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--t-small)",
                fontWeight: 500,
                color: "var(--ink)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {proposal?.title || "—"}
            </span>
            <AnimatePresence>
              {isDirty && !isSaving && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}
                >
                  · kaydedilmedi
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Center: preview toggle */}
      <div
        style={{
          display: "flex",
          background: "var(--sand)",
          borderRadius: 10,
          padding: 3,
          gap: 2,
          flexShrink: 0,
        }}
      >
        {[
          { label: isMobile ? "Düzen" : "Editör", value: false },
          { label: isMobile ? "Önizle" : "Önizleme", value: true },
        ].map((tab) => (
          <button
            key={String(tab.value)}
            onClick={() => setPreviewMode(tab.value)}
            style={{
              padding: isMobile ? "5px 10px" : "5px 14px",
              borderRadius: 8,
              border: "none",
              background: previewMode === tab.value ? "white" : "transparent",
              color: previewMode === tab.value ? "var(--ink)" : "var(--muted)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--t-label)",
              fontWeight: previewMode === tab.value ? 600 : 400,
              cursor: "pointer",
              transition: "all var(--duration-fast)",
              boxShadow:
                previewMode === tab.value
                  ? "0 1px 4px rgba(26,26,46,0.08)"
                  : "none",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right: actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-xs)",
          flexShrink: 0,
        }}
      >
        {/* Share — icon only on mobile */}
        <button
          onClick={handleShare}
          title="Paylaş"
          style={{
            height: isMobile ? 32 : 34,
            padding: isMobile ? "0 8px" : "0 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "white",
            color: "var(--ink-soft)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-label)",
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all var(--duration-fast)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--ocean)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border)")
          }
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle
              cx="10"
              cy="2.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="10"
              cy="10.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle
              cx="2.5"
              cy="6.5"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M4 7L8.5 9.5M8.5 3.5L4 6"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          {!isMobile && "Paylaş"}
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!isDirty || isSaving || isPending}
          style={{
            height: isMobile ? 32 : 34,
            padding: isMobile ? "0 12px" : "0 16px",
            borderRadius: 8,
            border: "none",
            background: isDirty ? "var(--ocean)" : "var(--dune)",
            color: isDirty ? "white" : "var(--muted)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--t-label)",
            fontWeight: 600,
            cursor: isDirty ? "pointer" : "not-allowed",
            transition: "all var(--duration-fast)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            if (isDirty) e.currentTarget.style.background = "#154360";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDirty
              ? "var(--ocean)"
              : "var(--dune)";
          }}
        >
          {isSaving ? "..." : "Kaydet"}
        </button>
      </div>
    </div>
  );
}
