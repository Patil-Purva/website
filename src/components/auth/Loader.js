"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Loader() {
    const pathname = usePathname();
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        // ❌ DON'T run on login/signup pages
        if (pathname === "/login" || pathname === "/signup") return;

        const fetchUser = async () => {
            try {
                const res = await api.get("api/v1/auth/me");
                login(res.data.data);
            } catch (err) {
                logout();
            }
        };

        fetchUser();
    }, [pathname]);

    return null;
}