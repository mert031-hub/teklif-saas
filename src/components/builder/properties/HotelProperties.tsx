"use client";
import {
  useBlockData,
  Field,
  TextInput,
  TextareaInput,
  NumberInput,
  SectionDivider,
} from "./shared";
import type { ProposalBlock } from "@/types";

export function HotelProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, unknown>;
  return (
    <>
      <Field label="Otel Adı">
        <TextInput
          value={(d.name as string) || ""}
          onChange={(v) => update("name", v)}
          placeholder="Örn: Rixos Premium"
        />
      </Field>
      <Field label="Yıldız (1-5)">
        <NumberInput
          value={(d.stars as number) || 5}
          onChange={(v) => update("stars", v)}
          min={1}
          max={5}
        />
      </Field>
      <Field label="Açıklama">
        <TextareaInput
          value={(d.description as string) || ""}
          onChange={(v) => update("description", v)}
          rows={4}
        />
      </Field>
      <SectionDivider label="Konum" />
      <Field label="Şehir / Destinasyon">
        <TextInput
          value={(d.location as string) || ""}
          onChange={(v) => update("location", v)}
          placeholder="Antalya, Türkiye"
        />
      </Field>
    </>
  );
}
