// src/lib/store/auth.ts
// Lightweight auth store — agency + profile cached client-side

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Agency, Profile } from "@/types";

interface AuthState {
  agency: Agency | null;
  profile: Profile | null;
  setAgency: (agency: Agency | null) => void;
  setProfile: (profile: Profile | null) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      agency: null,
      profile: null,
      setAgency: (agency) => set({ agency }),
      setProfile: (profile) => set({ profile }),
      clear: () => set({ agency: null, profile: null }),
    }),
    {
      name: "teklifai-auth",
      // Only persist agency id + brand color — enough for UI
      partialize: (state) => ({
        agency: state.agency
          ? {
              id: state.agency.id,
              name: state.agency.name,
              brand_color: state.agency.brand_color,
              slug: state.agency.slug,
            }
          : null,
        profile: state.profile
          ? {
              id: state.profile.id,
              full_name: state.profile.full_name,
              role: state.profile.role,
              agency_id: state.profile.agency_id,
            }
          : null,
      }),
    },
  ),
);
