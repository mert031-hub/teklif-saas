"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/store/builder";
import type { ProposalBlock } from "@/types";

const BLOCK_TYPES = [
  {
    category: "İçerik",
    blocks: [
      {
        type: "hero" as const,
        label: "Hero",
        description: "Kapak görseli ve başlık",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1"
              y="3"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M1 13L5 9L8 12L12 7L19 13"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="6"
              cy="7"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        ),
      },
      {
        type: "text" as const,
        label: "Metin",
        description: "Serbest metin alanı",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M3 5H17M3 9H13M3 13H15M3 17H10"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        type: "gallery" as const,
        label: "Galeri",
        description: "Fotoğraf galerisi",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1"
              y="1"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="11"
              y="1"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="1"
              y="11"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <rect
              x="11"
              y="11"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        ),
      },
      {
        type: "video" as const,
        label: "Video",
        description: "YouTube / Vimeo embed",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="1"
              y="3"
              width="18"
              height="14"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M8 7.5L13 10L8 12.5V7.5Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Seyahat",
    blocks: [
      {
        type: "hotel" as const,
        label: "Otel",
        description: "Otel bilgisi ve odalar",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 18V7L10 2L18 7V18"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <rect
              x="7"
              y="12"
              width="6"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <rect
              x="5"
              y="8"
              width="3"
              height="3"
              rx="0.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x="12"
              y="8"
              width="3"
              height="3"
              rx="0.5"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
        ),
      },
      {
        type: "flight" as const,
        label: "Uçuş",
        description: "Uçuş detayları",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M2 12L8 10L14 16L16 14L12 6L14 4C15 3 16.5 3.5 17 5C17.5 6.5 17 8 16 9L18 11L16 13L13 11L8 13L6 18L4 16L6 12"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        type: "map" as const,
        label: "Harita",
        description: "Destinasyon haritası",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7 2L1 5V18L7 15L13 18L19 15V2L13 5L7 2Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path d="M7 2V15M13 5V18" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        ),
      },
    ],
  },
  {
    category: "Fiyat",
    blocks: [
      {
        type: "price" as const,
        label: "Fiyat",
        description: "Fiyat ve seçenekler",
        icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path
              d="M10 5V6M10 14V15M7.5 8C7.5 6.9 8.6 6 10 6C11.4 6 12.5 6.9 12.5 8C12.5 9.1 11.4 10 10 10C8.6 10 7.5 10.9 7.5 12C7.5 13.1 8.6 14 10 14C11.4 14 12.5 13.1 12.5 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
];

function BlockItem({
  block,
  onAdd,
}: {
  block: {
    type: ProposalBlock["type"];
    label: string;
    description: string;
    icon: React.ReactNode;
  };
  onAdd: () => void;
}) {
  return (
    <button
      onClick={onAdd}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "white",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--ocean)";
        e.currentTarget.style.background = "rgba(27,79,114,0.04)";
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(27,79,114,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.background = "white";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "var(--sand)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ocean)",
          flexShrink: 0,
        }}
      >
        {block.icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.83rem",
            fontWeight: 600,
            color: "var(--ink)",
            marginBottom: 1,
          }}
        >
          {block.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.72rem",
            color: "var(--muted)",
          }}
        >
          {block.description}
        </div>
      </div>
      <div
        style={{
          marginLeft: "auto",
          color: "var(--dim)",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 2V12M2 7H12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
}

export function BlockPalette() {
  const { addBlock, proposal } = useBuilderStore();
  const [search, setSearch] = useState("");

  const handleAdd = (type: ProposalBlock["type"]) => {
    const newBlock: ProposalBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type,
      order: proposal?.blocks.length ?? 0,
      visible: true,
      data: getDefaultData(type),
    };
    addBlock(newBlock);
  };

  const filtered = search.trim()
    ? BLOCK_TYPES.map((cat) => ({
        ...cat,
        blocks: cat.blocks.filter((b) =>
          b.label.toLowerCase().includes(search.toLowerCase()),
        ),
      })).filter((cat) => cat.blocks.length > 0)
    : BLOCK_TYPES;

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        borderRight: "1px solid var(--border)",
        background: "var(--ivory)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: "var(--muted)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}
        >
          Bloklar
        </div>
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Blok ara..."
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "white",
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            color: "var(--ink)",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Block list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {filtered.map((cat) => (
          <div key={cat.category}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "var(--dim)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                paddingLeft: 2,
              }}
            >
              {cat.category}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              {cat.blocks.map((block) => (
                <BlockItem
                  key={block.type}
                  block={block}
                  onAdd={() => handleAdd(block.type)}
                />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--muted)",
            }}
          >
            Blok bulunamadı
          </div>
        )}
      </div>
    </div>
  );
}

function getDefaultData(type: ProposalBlock["type"]): Record<string, unknown> {
  const defaults: Record<ProposalBlock["type"], Record<string, unknown>> = {
    hero: { title: "Hayalinizdeki Tatil", subtitle: "", imageUrl: "" },
    text: { content: "Metninizi buraya yazın." },
    hotel: {
      name: "Otel Adı",
      stars: 5,
      images: [],
      description: "",
      roomOptions: [],
    },
    flight: {
      from: "",
      to: "",
      airline: "",
      departure: "",
      arrival: "",
      class: "economy",
    },
    video: { videoId: "", platform: "youtube", caption: "" },
    gallery: { images: [], columns: 3 },
    price: { basePrice: 0, currency: "TRY", options: [], note: "" },
    map: { location: "", lat: 0, lng: 0, zoom: 12 },
  };
  return defaults[type] ?? {};
}
