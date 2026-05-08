"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Loader() {
    const pathname = usePathname();

    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const hasFetched = useRef(false);

    useEffect(() => {

        // ✅ PUBLIC ROUTES
        const publicRoutes = [
            "/",
            "/login",
            "/signup",
            "/about",
            "/services",
            "/contact",
        ];

        // ✅ Skip auth check on public pages
        if (publicRoutes.includes(pathname)) {
            return;
        }

        // ✅ Already logged in
        if (user) return;

        // ✅ Prevent duplicate calls
        if (hasFetched.current) return;

        hasFetched.current = true;

        const fetchUser = async () => {
            try {
                console.log("🔁 auth/me called");

                const res = await api.get("/api/v1/auth/me");

                login(res.data.data);

            } catch (err) {
                console.log("❌ auth/me failed");

                logout();
            }
        };

        fetchUser();

    }, [pathname, user, login, logout]);

    return null;
}