"use client";
import { useBlockData, Field, TextareaInput } from "./shared";
import type { ProposalBlock } from "@/types";

export function TextProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, string>;
  return (
    <Field label="İçerik">
      <TextareaInput
        value={d.content || ""}
        onChange={(v) => update("content", v)}
        rows={6}
        placeholder="Metninizi buraya yazın..."
      />
    </Field>
  );
}
