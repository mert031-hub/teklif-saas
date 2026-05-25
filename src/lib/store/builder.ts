// src/lib/store/builder.ts
import { create } from "zustand";
import { temporal } from "zundo";
import type { Proposal, ProposalBlock } from "@/types";

interface BuilderState {
  proposal: Proposal | null;
  selectedBlockId: string | null;
  previewMode: boolean;
  isDirty: boolean;
  isSaving: boolean;

  setProposal: (proposal: Proposal) => void;
  setSelectedBlock: (id: string | null) => void;
  setPreviewMode: (mode: boolean) => void;
  setSaving: (saving: boolean) => void;

  addBlock: (block: ProposalBlock) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, partial: Partial<ProposalBlock>) => void;
  updateBlockData: (id: string, key: string, value: unknown) => void;
  reorderBlocks: (blocks: ProposalBlock[]) => void;

  updateTitle: (title: string) => void;
  updateTheme: (theme: Partial<Proposal["theme"]>) => void;
}

export const useBuilderStore = create<BuilderState>()(
  temporal(
    (set) => ({
      proposal: null,
      selectedBlockId: null,
      previewMode: false,
      isDirty: false,
      isSaving: false,

      setProposal: (proposal) => set({ proposal, isDirty: false }),

      setSelectedBlock: (id) => set({ selectedBlockId: id }),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      setSaving: (saving) =>
        set((s) => ({ isSaving: saving, isDirty: saving ? s.isDirty : false })),

      addBlock: (block) =>
        set((s) => {
          if (!s.proposal) return s;
          return {
            proposal: { ...s.proposal, blocks: [...s.proposal.blocks, block] },
            isDirty: true,
            selectedBlockId: block.id,
          };
        }),

      removeBlock: (id) =>
        set((s) => {
          if (!s.proposal) return s;
          return {
            proposal: {
              ...s.proposal,
              blocks: s.proposal.blocks
                .filter((b) => b.id !== id)
                .map((b, i) => ({ ...b, order: i })),
            },
            selectedBlockId:
              s.selectedBlockId === id ? null : s.selectedBlockId,
            isDirty: true,
          };
        }),

      updateBlock: (id, partial) =>
        set((s) => {
          if (!s.proposal) return s;
          return {
            proposal: {
              ...s.proposal,
              blocks: s.proposal.blocks.map((b) =>
                b.id === id ? { ...b, ...partial } : b,
              ),
            },
            isDirty: true,
          };
        }),

      // Merges a single data key without replacing entire data object
      updateBlockData: (id, key, value) =>
        set((s) => {
          if (!s.proposal) return s;
          return {
            proposal: {
              ...s.proposal,
              blocks: s.proposal.blocks.map((b) =>
                b.id === id ? { ...b, data: { ...b.data, [key]: value } } : b,
              ),
            },
            isDirty: true,
          };
        }),

      reorderBlocks: (blocks) =>
        set((s) => {
          if (!s.proposal) return s;
          return { proposal: { ...s.proposal, blocks }, isDirty: true };
        }),

      updateTitle: (title) =>
        set((s) => {
          if (!s.proposal) return s;
          return { proposal: { ...s.proposal, title }, isDirty: true };
        }),

      updateTheme: (theme) =>
        set((s) => {
          if (!s.proposal) return s;
          return {
            proposal: {
              ...s.proposal,
              theme: { ...s.proposal.theme, ...theme },
            },
            isDirty: true,
          };
        }),
    }),
    {
      partialize: (s) => ({ proposal: s.proposal }) as Partial<BuilderState>,
      limit: 50,
    },
  ),
);
