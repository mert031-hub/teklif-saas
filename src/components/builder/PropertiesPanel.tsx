"use client";

import { useBuilderStore } from "@/lib/store/builder";
import { HeroProperties } from "./properties/HeroProperties";
import { TextProperties } from "./properties/TextProperties";
import { HotelProperties } from "./properties/HotelProperties";
import { FlightProperties } from "./properties/FlightProperties";
import { VideoProperties } from "./properties/VideoProperties";
import { GalleryProperties } from "./properties/GalleryProperties";
import { PriceProperties } from "./properties/PriceProperties";
import { MapProperties } from "./properties/MapProperties";
import type { ProposalBlock } from "@/types";

const PANELS: Record<
  ProposalBlock["type"],
  React.ComponentType<{ block: ProposalBlock }>
> = {
  hero: HeroProperties,
  text: TextProperties,
  hotel: HotelProperties,
  flight: FlightProperties,
  video: VideoProperties,
  gallery: GalleryProperties,
  price: PriceProperties,
  map: MapProperties,
};

export function PropertiesPanel() {
  const { proposal, selectedBlockId } = useBuilderStore();
  const block = proposal?.blocks.find((b) => b.id === selectedBlockId);

  /* No selection */
  if (!block) {
    return (
      <div
        style={{
          width: 300,
          flexShrink: 0,
          borderLeft: "1px solid var(--border)",
          background: "var(--ivory)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          padding: "2rem",
          color: "var(--dim)",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="4"
            stroke="var(--dune)"
            strokeWidth="1.5"
          />
          <path
            d="M10 16H22M16 10V22"
            stroke="var(--dune)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            color: "var(--muted)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Düzenlemek için bir blok seçin
        </p>
      </div>
    );
  }

  const PanelComponent = PANELS[block.type];

  return (
    <div
      style={{
        width: 300,
        flexShrink: 0,
        borderLeft: "1px solid var(--border)",
        background: "var(--ivory)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.875rem 1rem",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--muted)",
            textTransform: "uppercase",
          }}
        >
          Özellikler — {block.type}
        </span>
        <button
          onClick={() => useBuilderStore.getState().setSelectedBlock(null)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--dim)",
            padding: 2,
            borderRadius: 4,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 2L12 12M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Panel content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        <PanelComponent block={block} />
      </div>
    </div>
  );
}
