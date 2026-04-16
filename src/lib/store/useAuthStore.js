import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            hasHydrated: false,

            login: (user) => set({ user }),
            logout: () => set({ user: null }),

            setHydrated: (state) => set({ hasHydrated: state }),
        }),
        {
            name: "auth-storage",

            onRehydrateStorage: () => (state) => {
                state.setHydrated(true);
            },
        }
    )
);