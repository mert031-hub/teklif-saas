"use client";

import { useEffect, useState } from "react";
import { useBuilderStore } from "@/lib/store/builder";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { BuilderNav } from "./BuilderNav";
import { BlockPalette } from "./BlockPalette";
import { BuilderCanvas } from "./BuilderCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { motion, AnimatePresence } from "framer-motion";
import type { Proposal } from "@/types";

type MobileTab = "blocks" | "canvas" | "properties";

/* ─── Mobile tab bar ─── */
function MobileTabBar({
  active,
  onChange,
}: {
  active: MobileTab;
  onChange: (t: MobileTab) => void;
}) {
  const tabs: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "blocks",
      label: "Bloklar",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="1"
            y="1"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="10"
            y="1"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="1"
            y="10"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect
            x="10"
            y="10"
            width="7"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      ),
    },
    {
      id: "canvas",
      label: "Canvas",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect
            x="1"
            y="1"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M5 9H13M9 5V13"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "properties",
      label: "Özellikler",
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M3 5H15M3 9H10M3 13H12"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid var(--border)",
        background: "var(--ivory)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            padding: "var(--space-sm) var(--space-xs)",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: active === tab.id ? "var(--ocean)" : "var(--muted)",
            borderBottom: `2px solid ${active === tab.id ? "var(--ocean)" : "transparent"}`,
            transition: "all var(--duration-fast)",
            minHeight: 52,
          }}
        >
          {tab.icon}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Main shell ─── */
export function BuilderShell({
  initialProposal,
}: {
  initialProposal: Proposal;
}) {
  const { setProposal, previewMode } = useBuilderStore();
  const isMobile = useBreakpoint("md"); // < 768px
  const isTablet = useBreakpoint("lg"); // < 1024px
  const [mobileTab, setMobileTab] = useState<MobileTab>("canvas");

  useEffect(() => {
    setProposal(initialProposal);
  }, [initialProposal.id]);

  /* ── Mobile layout ── */
  if (isMobile) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100svh",
          overflow: "hidden",
          background: "var(--ivory)",
        }}
      >
        <BuilderNav />
        {!previewMode && (
          <MobileTabBar active={mobileTab} onChange={setMobileTab} />
        )}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <AnimatePresence mode="wait">
            {previewMode || mobileTab === "canvas" ? (
              <motion.div
                key="canvas"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: "100%" }}
              >
                <BuilderCanvas />
              </motion.div>
            ) : mobileTab === "blocks" ? (
              <motion.div
                key="blocks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: "100%", overflowY: "auto" }}
              >
                <BlockPalette />
              </motion.div>
            ) : (
              <motion.div
                key="props"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ height: "100%", overflowY: "auto" }}
              >
                <PropertiesPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  /* ── Tablet layout: canvas full width, panels as drawers ── */
  if (isTablet && !previewMode) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100svh",
          overflow: "hidden",
        }}
      >
        <BuilderNav />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Collapsed palette — icon only */}
          <div
            style={{
              width: 56,
              flexShrink: 0,
              borderRight: "1px solid var(--border)",
              background: "var(--ivory)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "var(--space-md)",
              gap: "var(--space-sm)",
            }}
          >
            <BlockPaletteIconOnly />
          </div>
          <BuilderCanvas />
          {/* Properties only when block selected */}
          <TabletPropertiesDrawer />
        </div>
      </div>
    );
  }

  /* ── Desktop layout: full 3-panel ── */
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100svh",
        overflow: "hidden",
        background: "var(--ivory)",
      }}
    >
      <BuilderNav />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {!previewMode && <BlockPalette />}
        <BuilderCanvas />
        {!previewMode && <PropertiesPanel />}
      </div>
    </div>
  );
}

/* ─── Tablet: icon-only palette ─── */
function BlockPaletteIconOnly() {
  const { addBlock, proposal } = useBuilderStore();
  const blocks = [
    { type: "hero" as const, icon: "⬛", label: "Hero" },
    { type: "hotel" as const, icon: "🏨", label: "Otel" },
    { type: "flight" as const, icon: "✈️", label: "Uçuş" },
    { type: "video" as const, icon: "▶️", label: "Video" },
    { type: "gallery" as const, icon: "🖼", label: "Galeri" },
    { type: "price" as const, icon: "💰", label: "Fiyat" },
    { type: "text" as const, icon: "📝", label: "Metin" },
    { type: "map" as const, icon: "🗺", label: "Harita" },
  ];
  return (
    <>
      {blocks.map((b) => (
        <button
          key={b.type}
          title={b.label}
          onClick={() =>
            addBlock({
              id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              type: b.type,
              order: proposal?.blocks.length ?? 0,
              visible: true,
              data: {},
            })
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
            background: "white",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all var(--duration-fast)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--ocean)";
            e.currentTarget.style.background = "var(--ocean-pale)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "white";
          }}
        >
          {b.icon}
        </button>
      ))}
    </>
  );
}

/* ─── Tablet: slide-in properties drawer ─── */
function TabletPropertiesDrawer() {
  const { selectedBlockId } = useBuilderStore();
  return (
    <AnimatePresence>
      {selectedBlockId && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            overflow: "hidden",
            flexShrink: 0,
            borderLeft: "1px solid var(--border)",
          }}
        >
          <PropertiesPanel />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
