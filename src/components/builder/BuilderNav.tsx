"use client";

import { useState, useTransition } from "react";
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
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

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

  const getProposalUrl = () =>
    proposal?.slug ? `${window.location.origin}/p/${proposal.slug}` : "";

  const handleCopyLink = () => {
    const url = getProposalUrl();
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShareOpen(false);
  };

  const handleWhatsApp = () => {
    const url = getProposalUrl();
    if (!url) return;
    const text = `Merhaba! "${proposal?.title}" için hazırladığım teklifi inceleyebilirsiniz: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    setShareOpen(false);
  };

  const handleEmail = () => {
    const url = getProposalUrl();
    if (!url) return;
    const subject = encodeURIComponent(`Seyahat Teklifi — ${proposal?.title}`);
    const body = encodeURIComponent(
      `Merhaba,\n\nSizin için özel bir seyahat teklifi hazırladım. Aşağıdaki linkten inceleyebilirsiniz:\n\n${url}\n\nİyi günler dilerim.`,
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShareOpen(false);
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
              {isSaving && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}
                >
                  · kaydediliyor...
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

      {/* Right: share dropdown + save */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-xs)",
          flexShrink: 0,
        }}
      >
        {/* Share dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShareOpen(!shareOpen)}
            style={{
              height: isMobile ? 32 : 34,
              padding: isMobile ? "0 10px" : "0 14px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: copied ? "rgba(107,143,113,0.1)" : "white",
              color: copied ? "var(--sage)" : "var(--ink-soft)",
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
            onMouseLeave={(e) => {
              if (!copied) e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M2 7L5 10L11 3"
                    stroke="var(--sage)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                {!isMobile && "Kopyalandı"}
              </>
            ) : (
              <>
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
              </>
            )}
          </button>

          {/* Share menu */}
          <AnimatePresence>
            {shareOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 49 }}
                  onClick={() => setShareOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: 0,
                    width: 200,
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "0 8px 32px rgba(26,26,46,0.12)",
                    overflow: "hidden",
                    zIndex: 50,
                  }}
                >
                  {[
                    {
                      label: "Linki Kopyala",
                      onClick: handleCopyLink,
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <rect
                            x="5"
                            y="1"
                            width="9"
                            height="9"
                            rx="1.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M1 5H4M1 5V14H10V11"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                    },
                    {
                      label: "WhatsApp",
                      onClick: handleWhatsApp,
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <path
                            d="M7.5 1C3.9 1 1 3.9 1 7.5C1 8.8 1.4 10 2 11L1 14L4.2 13C5.2 13.6 6.3 14 7.5 14C11.1 14 14 11.1 14 7.5C14 3.9 11.1 1 7.5 1Z"
                            stroke="#25D366"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M5.5 5C5.5 5 5 6 5.5 7C6 8 7 9 8 9.5C9 10 10 9.5 10 9.5"
                            stroke="#25D366"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                      color: "#25D366",
                    },
                    {
                      label: "E-posta",
                      onClick: handleEmail,
                      icon: (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="3"
                            width="13"
                            height="9"
                            rx="1.5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M1 4L7.5 8.5L14 4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "var(--space-sm) var(--space-md)",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--t-small)",
                        color: item.color || "var(--ink-soft)",
                        textAlign: "left",
                        transition: "background var(--duration-fast)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "var(--sand)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "none")
                      }
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

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
