import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    fetchUser: async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/v1/auth/me",
                { withCredentials: true }
            );
            set({ user: res.data.data });
        } catch (err) {
            set({ user: null });
        } finally {
            set({ loading: false });
        }
    },

    login: async (data) => {
        const res = await axios.post(
            "http://localhost:5000/api/v1/auth/login",
            data,
            { withCredentials: true }
        );

        set({ user: res.data.data });
    },

    logout: async () => {
        await axios.post(
            "http://localhost:5000/api/v1/auth/logout",
            {},
            { withCredentials: true }
        );

        set({ user: null });
    },
}));