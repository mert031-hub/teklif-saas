"use client";
import { useState } from "react";
import { useBlockData, Field, TextInput, SelectInput } from "./shared";
import type { ProposalBlock } from "@/types";

export function GalleryProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as { images: string[]; columns: number };
  const [newUrl, setNewUrl] = useState("");

  const addImage = () => {
    if (!newUrl.trim()) return;
    update("images", [...(d.images || []), newUrl.trim()]);
    setNewUrl("");
  };

  const removeImage = (i: number) => {
    const imgs = [...(d.images || [])];
    imgs.splice(i, 1);
    update("images", imgs);
  };

  return (
    <>
      <Field label="Kolon Sayısı">
        <SelectInput
          value={String(d.columns || 3)}
          onChange={(v) => update("columns", Number(v))}
          options={[
            { label: "2 Kolon", value: "2" },
            { label: "3 Kolon", value: "3" },
            { label: "4 Kolon", value: "4" },
          ]}
        />
      </Field>
      <Field label="Görsel Ekle">
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://..."
            onKeyDown={(e) => e.key === "Enter" && addImage()}
            style={{
              flex: 1,
              padding: "8px 10px",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "var(--ink)",
              outline: "none",
            }}
          />
          <button
            onClick={addImage}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              background: "var(--ocean)",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
            }}
          >
            Ekle
          </button>
        </div>
      </Field>
      {(d.images || []).map((url, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 8px",
            borderRadius: 8,
            background: "white",
            border: "1px solid var(--border)",
            marginBottom: 4,
          }}
        >
          <div
            style={{
              width: 32,
              height: 24,
              borderRadius: 4,
              background: `url(${url}) center/cover`,
              flexShrink: 0,
              border: "1px solid var(--border)",
            }}
          />
          <span
            style={{
              flex: 1,
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "var(--muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </span>
          <button
            onClick={() => removeImage(i)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--dim)",
              padding: 2,
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
}
