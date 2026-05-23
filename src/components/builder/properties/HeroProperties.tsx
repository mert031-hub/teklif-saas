"use client";
import { useBlockData, Field, TextInput, TextareaInput } from "./shared";
import type { ProposalBlock } from "@/types";

export function HeroProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, string>;
  return (
    <>
      <Field label="Başlık">
        <TextInput
          value={d.title || ""}
          onChange={(v) => update("title", v)}
          placeholder="Hayalinizdeki Tatil"
        />
      </Field>
      <Field label="Alt Başlık">
        <TextInput
          value={d.subtitle || ""}
          onChange={(v) => update("subtitle", v)}
          placeholder="Kısa bir açıklama"
        />
      </Field>
      <Field label="Görsel URL">
        <TextInput
          value={d.imageUrl || ""}
          onChange={(v) => update("imageUrl", v)}
          placeholder="https://..."
        />
      </Field>
    </>
  );
}
