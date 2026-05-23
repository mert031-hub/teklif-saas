"use client";
import { useBlockData, Field, TextInput, SelectInput } from "./shared";
import type { ProposalBlock } from "@/types";

export function VideoProperties({ block }: { block: ProposalBlock }) {
  const update = useBlockData(block.id);
  const d = block.data as Record<string, string>;
  return (
    <>
      <Field label="Platform">
        <SelectInput
          value={d.platform || "youtube"}
          onChange={(v) => update("platform", v)}
          options={[
            { label: "YouTube", value: "youtube" },
            { label: "Vimeo", value: "vimeo" },
          ]}
        />
      </Field>
      <Field label="Video ID">
        <TextInput
          value={d.videoId || ""}
          onChange={(v) => update("videoId", v)}
          placeholder={d.platform === "vimeo" ? "123456789" : "dQw4w9WgXcQ"}
        />
      </Field>
      <Field label="Başlık (opsiyonel)">
        <TextInput
          value={d.caption || ""}
          onChange={(v) => update("caption", v)}
          placeholder="Video açıklaması"
        />
      </Field>
    </>
  );
}
