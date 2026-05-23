"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "@/lib/store/builder";
import type { ProposalBlock } from "@/types";

/* ── Block type label map ── */
const BLOCK_LABELS: Record<ProposalBlock["type"], string> = {
  hero: "Hero",
  text: "Metin",
  hotel: "Otel",
  flight: "Uçuş",
  video: "Video",
  gallery: "Galeri",
  price: "Fiyat",
  map: "Harita",
};

/* ── Sortable block row ── */
function SortableBlock({ block }: { block: ProposalBlock }) {
  const { selectedBlockId, setSelectedBlock, removeBlock, updateBlock } =
    useBuilderStore();

  const isSelected = selectedBlockId === block.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedBlock(isSelected ? null : block.id)}
    >
      <div
        style={{
          borderRadius: 12,
          border: `1.5px solid ${isSelected ? "var(--ocean)" : "var(--border)"}`,
          background: isSelected ? "rgba(27,79,114,0.03)" : "white",
          overflow: "hidden",
          transition: "border-color 0.15s, box-shadow 0.15s",
          boxShadow: isSelected
            ? "0 0 0 3px rgba(27,79,114,0.1)"
            : "0 1px 4px rgba(26,26,46,0.05)",
          cursor: "pointer",
        }}
      >
        {/* Block header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 14px",
            borderBottom: "1px solid var(--border-soft)",
            gap: 8,
          }}
        >
          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              color: "var(--dim)",
              display: "flex",
              alignItems: "center",
              padding: "2px 4px",
              borderRadius: 4,
              flexShrink: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="4" cy="3.5" r="1" fill="currentColor" />
              <circle cx="10" cy="3.5" r="1" fill="currentColor" />
              <circle cx="4" cy="7" r="1" fill="currentColor" />
              <circle cx="10" cy="7" r="1" fill="currentColor" />
              <circle cx="4" cy="10.5" r="1" fill="currentColor" />
              <circle cx="10" cy="10.5" r="1" fill="currentColor" />
            </svg>
          </div>

          {/* Block type badge */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: isSelected ? "var(--ocean)" : "var(--muted)",
              textTransform: "uppercase",
            }}
          >
            {BLOCK_LABELS[block.type]}
          </span>

          <div style={{ flex: 1 }} />

          {/* Visibility toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              updateBlock(block.id, { visible: !block.visible });
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              color: block.visible ? "var(--muted)" : "var(--dim)",
              transition: "color 0.15s",
            }}
            title={block.visible ? "Gizle" : "Göster"}
          >
            {block.visible ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 7C1 7 3 3 7 3C11 3 13 7 13 7C13 7 11 11 7 11C3 11 1 7 1 7Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle
                  cx="7"
                  cy="7"
                  r="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2L12 12M5.5 4.2C6 4 6.5 3.9 7 3.9C11 3.9 13 7.5 13 7.5C12.5 8.3 11.8 9.1 11 9.7M8.5 9.8C8 10 7.5 10.1 7 10.1C3 10.1 1 6.5 1 6.5C1.5 5.7 2.2 4.9 3 4.3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              borderRadius: 4,
              color: "var(--dim)",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
            title="Sil"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 3H11M5 3V2H8V3M4 3V10.5C4 11 4.4 11.5 5 11.5H8C8.6 11.5 9 11 9 10.5V3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Block preview area */}
        <BlockPreview block={block} />
      </div>
    </motion.div>
  );
}

/* ── Minimal block preview inside canvas ── */
function BlockPreview({ block }: { block: ProposalBlock }) {
  const data = block.data as Record<string, unknown>;

  const previewContent: Record<ProposalBlock["type"], React.ReactNode> = {
    hero: (
      <div
        style={{
          height: 80,
          background:
            "linear-gradient(135deg, var(--sand) 0%, var(--dune) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "var(--ink-soft)",
            fontStyle: "italic",
          }}
        >
          {(data.title as string) || "Hero Başlığı"}
        </span>
      </div>
    ),
    text: (
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8rem",
          color: "var(--muted)",
          lineHeight: 1.6,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical" as const,
        }}
      >
        {(data.content as string) || "Metin içeriği..."}
      </p>
    ),
    hotel: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 48,
            height: 36,
            background: "var(--sand)",
            borderRadius: 6,
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "var(--ink)",
            }}
          >
            {(data.name as string) || "Otel Adı"}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
            }}
          >
            {"★".repeat(Number(data.stars) || 5)}
          </div>
        </div>
      </div>
    ),
    flight: (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--ink)",
            fontWeight: 600,
          }}
        >
          {(data.from as string) || "IST"}
        </span>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <path
            d="M2 6H22M18 2L22 6L18 10"
            stroke="var(--ocean)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.82rem",
            color: "var(--ink)",
            fontWeight: 600,
          }}
        >
          {(data.to as string) || "AYT"}
        </span>
      </div>
    ),
    video: (
      <div
        style={{
          height: 60,
          background: "var(--ink)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />
          <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="rgba(255,255,255,0.6)" />
        </svg>
      </div>
    ),
    gallery: (
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 40,
              background: "var(--dune)",
              borderRadius: 4,
            }}
          />
        ))}
      </div>
    ),
    price: (
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            color: "var(--ocean)",
            letterSpacing: "-0.02em",
          }}
        >
          ₺{((data.basePrice as number) || 0).toLocaleString("tr-TR")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--muted)",
          }}
        >
          {(data.currency as string) || "TRY"}
        </span>
      </div>
    ),
    map: (
      <div
        style={{
          height: 60,
          background: "linear-gradient(135deg, #e8f4f8 0%, #d6eaf8 100%)",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1C4.8 1 3 2.8 3 5C3 8 7 13 7 13C7 13 11 8 11 5C11 2.8 9.2 1 7 1Z"
            stroke="var(--ocean)"
            strokeWidth="1.3"
          />
          <circle
            cx="7"
            cy="5"
            r="1.5"
            stroke="var(--ocean)"
            strokeWidth="1.2"
          />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.78rem",
            color: "var(--ocean)",
          }}
        >
          {(data.location as string) || "Konum belirtilmedi"}
        </span>
      </div>
    ),
  };

  return (
    <div
      style={{
        padding: "10px 14px",
        opacity: block.visible ? 1 : 0.4,
      }}
    >
      {previewContent[block.type]}
    </div>
  );
}

/* ── Empty canvas ── */
function EmptyCanvas() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: "1rem",
        color: "var(--dim)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          border: "2px dashed var(--dune)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 4V24M4 14H24"
            stroke="var(--dune)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.88rem",
            color: "var(--muted)",
            marginBottom: 4,
          }}
        >
          Henüz blok yok
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--dim)",
            letterSpacing: "0.08em",
          }}
        >
          Soldan blok ekleyin
        </p>
      </div>
    </div>
  );
}

/* ── Main canvas ── */
export function BuilderCanvas() {
  const { proposal, reorderBlocks, selectedBlockId } = useBuilderStore();
  const blocks = proposal?.blocks ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({
      ...b,
      order: i,
    }));
    reorderBlocks(reordered);
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        background: "var(--sand)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Canvas inner */}
      <div
        style={{
          maxWidth: 680,
          width: "100%",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {blocks.length === 0 ? (
          <EmptyCanvas />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <AnimatePresence>
                  {blocks
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((block) => (
                      <SortableBlock key={block.id} block={block} />
                    ))}
                </AnimatePresence>
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
