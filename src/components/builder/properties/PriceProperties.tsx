"use client";
import {
  useBlockData,
  Field,
  NumberInput,
  SelectInput,
  TextareaInput,
  SectionDivider,
} from "./shared";
import type { ProposalBlock } from "@/types";

export function PriceProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, unknown>;
  return (
    <>
      <Field label="Baz Fiyat">
        <NumberInput
          value={(d.basePrice as number) || 0}
          onChange={(v) => update("basePrice", v)}
          min={0}
        />
      </Field>
      <Field label="Para Birimi">
        <SelectInput
          value={(d.currency as string) || "TRY"}
          onChange={(v) => update("currency", v)}
          options={[
            { label: "₺ TRY", value: "TRY" },
            { label: "$ USD", value: "USD" },
            { label: "€ EUR", value: "EUR" },
          ]}
        />
      </Field>
      <SectionDivider label="Not" />
      <Field label="Açıklama">
        <TextareaInput
          value={(d.note as string) || ""}
          onChange={(v) => update("note", v)}
          rows={3}
          placeholder="Fiyata dahil olanlar..."
        />
      </Field>
    </>
  );
}
