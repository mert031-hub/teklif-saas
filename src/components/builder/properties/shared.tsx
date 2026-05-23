"use client";

import { useBuilderStore } from "@/lib/store/builder";
import type { ProposalBlock } from "@/types";

/* Hook: update a single data field */
export function useBlockData(blockId: string) {
  const { updateBlock } = useBuilderStore();
  return (key: string, value: unknown) => {
    updateBlock(blockId, {
      data: {
        ...useBuilderStore
          .getState()
          .proposal?.blocks.find((b) => b.id === blockId)?.data,
        [key]: value,
      },
    });
  };
}

/* Reusable field components */
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--ink-soft)",
          marginBottom: "0.4rem",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid var(--border)",
  borderRadius: 8,
  background: "white",
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.15s",
};

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputBase}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

export function TextareaInput({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputBase, resize: "vertical", lineHeight: 1.6 }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  placeholder,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      min={min}
      max={max}
      style={inputBase}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputBase, cursor: "pointer" }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ocean)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "1.25rem 0 1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.18em",
          color: "var(--dim)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}
