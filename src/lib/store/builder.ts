// src/lib/store/builder.ts
// Zustand builder store with undo/redo via zundo

import { create } from "zustand";
import { temporal } from "zundo";
import type { Proposal, ProposalBlock } from "@/types";

interface BuilderState {
  // Proposal data
  proposal: Proposal | null;
  selectedBlockId: string | null;

  // UI state
  previewMode: boolean;
  isDirty: boolean;
  isSaving: boolean;

  // Actions
  setProposal: (proposal: Proposal) => void;
  setSelectedBlock: (id: string | null) => void;
  setPreviewMode: (mode: boolean) => void;
  setSaving: (saving: boolean) => void;

  // Block operations
  addBlock: (block: ProposalBlock) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, partial: Partial<ProposalBlock>) => void;
  reorderBlocks: (blocks: ProposalBlock[]) => void;

  // Proposal metadata
  updateTitle: (title: string) => void;
  updateTheme: (theme: Partial<Proposal["theme"]>) => void;
}

export const useBuilderStore = create<BuilderState>()(
  temporal(
    (set, get) => ({
      proposal: null,
      selectedBlockId: null,
      previewMode: false,
      isDirty: false,
      isSaving: false,

      setProposal: (proposal) => set({ proposal, isDirty: false }),

      setSelectedBlock: (id) => set({ selectedBlockId: id }),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      setSaving: (saving) =>
        set({ isSaving: saving, isDirty: saving ? get().isDirty : false }),

      addBlock: (block) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: {
              ...state.proposal,
              blocks: [...state.proposal.blocks, block],
            },
            isDirty: true,
            selectedBlockId: block.id,
          };
        }),

      removeBlock: (id) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: {
              ...state.proposal,
              blocks: state.proposal.blocks
                .filter((b) => b.id !== id)
                .map((b, i) => ({ ...b, order: i })),
            },
            selectedBlockId:
              state.selectedBlockId === id ? null : state.selectedBlockId,
            isDirty: true,
          };
        }),

      updateBlock: (id, partial) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: {
              ...state.proposal,
              blocks: state.proposal.blocks.map((b) =>
                b.id === id ? { ...b, ...partial } : b,
              ),
            },
            isDirty: true,
          };
        }),

      reorderBlocks: (blocks) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: { ...state.proposal, blocks },
            isDirty: true,
          };
        }),

      updateTitle: (title) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: { ...state.proposal, title },
            isDirty: true,
          };
        }),

      updateTheme: (theme) =>
        set((state) => {
          if (!state.proposal) return state;
          return {
            proposal: {
              ...state.proposal,
              theme: { ...state.proposal.theme, ...theme },
            },
            isDirty: true,
          };
        }),
    }),
    {
      // Only track proposal blocks + theme in undo history
      // Don't track UI state (previewMode, isDirty, etc.)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => ["proposal"].includes(key)),
        ) as Partial<BuilderState>,
      limit: 50,
    },
  ),
);

// Expose undo/redo for keyboard shortcuts
export const useBuilderTemporal = () => useBuilderStore.temporal;
