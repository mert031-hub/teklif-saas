"use client";
import { useBlockData, Field, TextInput, NumberInput } from "./shared";
import type { ProposalBlock } from "@/types";

export function MapProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, unknown>;
  return (
    <>
      <Field label="Konum Adı">
        <TextInput
          value={(d.location as string) || ""}
          onChange={(v) => update("location", v)}
          placeholder="Antalya, Türkiye"
        />
      </Field>
      <Field label="Enlem (Lat)">
        <NumberInput
          value={(d.lat as number) || 0}
          onChange={(v) => update("lat", v)}
        />
      </Field>
      <Field label="Boylam (Lng)">
        <NumberInput
          value={(d.lng as number) || 0}
          onChange={(v) => update("lng", v)}
        />
      </Field>
      <Field label="Zoom (1-20)">
        <NumberInput
          value={(d.zoom as number) || 12}
          onChange={(v) => update("zoom", v)}
          min={1}
          max={20}
        />
      </Field>
    </>
  );
}
