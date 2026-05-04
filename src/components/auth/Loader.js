"use client";

import { useEffect, useRef } from "react";
import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Loader() {
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const hasFetched = useRef(false);

    useEffect(() => {
        // ✅ Already have user → no need to call API
        if (user) return;

        // ✅ Prevent duplicate calls (StrictMode / re-mount)
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchUser = async () => {
            try {
                console.log("🔁 auth/me API called");

                const res = await api.get("/api/v1/auth/me");
                login(res.data.data);
            } catch (err) {
                console.log("❌ auth/me failed");
                logout();
            }
        };

        fetchUser();
    }, [user, login, logout]);

    return null;
}