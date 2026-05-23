import { create } from "zustand";
import { temporal } from "zundo";
import type { Proposal, ProposalBlock, ProposalTheme } from "@/types";

interface BuilderState {
  proposal: Proposal | null;
  selectedBlockId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  previewMode: boolean;

  // Actions
  setProposal: (proposal: Proposal) => void;
  setSelectedBlock: (id: string | null) => void;
  setPreviewMode: (preview: boolean) => void;
  setSaving: (saving: boolean) => void;

  // Block actions
  addBlock: (block: ProposalBlock) => void;
  updateBlock: (id: string, data: Partial<ProposalBlock>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (blocks: ProposalBlock[]) => void;

  // Proposal actions
  updateProposalMeta: (meta: Partial<Proposal>) => void;
  updateTheme: (theme: Partial<ProposalTheme>) => void;

  reset: () => void;
}

export const useBuilderStore = create<BuilderState>()(
  temporal(
    (set) => ({
      proposal: null,
      selectedBlockId: null,
      isDirty: false,
      isSaving: false,
      previewMode: false,

      setProposal: (proposal) => set({ proposal, isDirty: false }),
      setSelectedBlock: (id) => set({ selectedBlockId: id }),
      setPreviewMode: (preview) => set({ previewMode: preview }),
      setSaving: (saving) => set({ isSaving: saving }),

      addBlock: (block) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: {
              ...state.proposal,
              blocks: [...state.proposal.blocks, block],
            },
            isDirty: true,
          };
        }),

      updateBlock: (id, data) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: {
              ...state.proposal,
              blocks: state.proposal.blocks.map((b) =>
                b.id === id ? { ...b, ...data } : b,
              ),
            },
            isDirty: true,
          };
        }),

      removeBlock: (id) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: {
              ...state.proposal,
              blocks: state.proposal.blocks.filter((b) => b.id !== id),
            },
            isDirty: true,
          };
        }),

      reorderBlocks: (blocks) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: { ...state.proposal, blocks },
            isDirty: true,
          };
        }),

      updateProposalMeta: (meta) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: { ...state.proposal, ...meta },
            isDirty: true,
          };
        }),

      updateTheme: (theme) =>
        set((state) => {
          if (!state.proposal) return {};
          return {
            proposal: {
              ...state.proposal,
              theme: { ...state.proposal.theme, ...theme },
            },
            isDirty: true,
          };
        }),

      reset: () =>
        set({
          proposal: null,
          selectedBlockId: null,
          isDirty: false,
          isSaving: false,
          previewMode: false,
        }),
    }),
    {
      limit: 30,
    },
  ),
);
