import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,

    register: (data) => {
        console.log("User Registered:", data);
        set({ user: data });
    },
}));