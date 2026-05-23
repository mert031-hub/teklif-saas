import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Agency, Profile } from "@/types";

interface AuthState {
  profile: Profile | null;
  agency: Agency | null;
  isLoading: boolean;
  setProfile: (profile: Profile | null) => void;
  setAgency: (agency: Agency | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      agency: null,
      isLoading: true,
      setProfile: (profile) => set({ profile }),
      setAgency: (agency) => set({ agency }),
      setLoading: (isLoading) => set({ isLoading }),
      reset: () => set({ profile: null, agency: null, isLoading: false }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        profile: state.profile,
        agency: state.agency,
      }),
    },
  ),
);
