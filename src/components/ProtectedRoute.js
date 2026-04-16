"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

    useEffect(() => {
        if (!hasHydrated) return;

        // ❌ Not logged in
        if (!user) {
            router.replace("/login");
            return;
        }

        // ❌ Wrong role
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            router.replace("/");
            return;
        }
    }, [user, hasHydrated, router]);

    // ⏳ Wait for Zustand hydration
    if (!hasHydrated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // ⏳ Prevent flicker before redirect
    if (!user) return null;

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return null;
    }

    return children;
}