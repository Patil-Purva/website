"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function LoginPage() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);
    const loginUser = useAuthStore((state) => state.login);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // ✅ AUTO REDIRECT IF ALREADY LOGGED IN
    useEffect(() => {
        if (!hasHydrated) return;

        if (user) {
            if (user.role === "doctor") {
                router.replace("/doctor/dashboard");
            } else {
                router.replace("/book-appointment");
            }
        }
    }, [user, hasHydrated, router]);

    // ✅ handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ handle login
    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);

        const res = await api.post("/api/v1/auth/login", form);
        const userData = res?.data?.data;

        loginUser(userData);

        // ❌ REMOVE redirect from here

    } catch (err) {
        console.log("Login error:", err.response?.data || err.message);
    } finally {
        setLoading(false);
    }
};

    // ⏳ wait for Zustand hydration
    if (!hasHydrated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // ⛔ if already logged in → don't show login form
    if (user) return null;

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
            >
                <h2 className="text-xl font-bold text-center text-green-600">
                    Login 🌿
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}