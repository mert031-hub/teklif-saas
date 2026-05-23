"use client";
import {
  useBlockData,
  Field,
  TextInput,
  SelectInput,
  SectionDivider,
} from "./shared";
import type { ProposalBlock } from "@/types";

export function FlightProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, string>;
  return (
    <>
      <SectionDivider label="Rota" />
      <Field label="Kalkış (IATA)">
        <TextInput
          value={d.from || ""}
          onChange={(v) => update("from", v)}
          placeholder="IST"
        />
      </Field>
      <Field label="Varış (IATA)">
        <TextInput
          value={d.to || ""}
          onChange={(v) => update("to", v)}
          placeholder="AYT"
        />
      </Field>
      <Field label="Havayolu">
        <TextInput
          value={d.airline || ""}
          onChange={(v) => update("airline", v)}
          placeholder="Turkish Airlines"
        />
      </Field>
      <SectionDivider label="Detaylar" />
      <Field label="Kalkış Saati">
        <TextInput
          value={d.departure || ""}
          onChange={(v) => update("departure", v)}
          placeholder="10:30"
        />
      </Field>
      <Field label="Varış Saati">
        <TextInput
          value={d.arrival || ""}
          onChange={(v) => update("arrival", v)}
          placeholder="12:15"
        />
      </Field>
      <Field label="Kabin">
        <SelectInput
          value={d.class || "economy"}
          onChange={(v) => update("class", v)}
          options={[
            { label: "Ekonomi", value: "economy" },
            { label: "Business", value: "business" },
            { label: "First Class", value: "first" },
          ]}
        />
      </Field>
    </>
  );
}
