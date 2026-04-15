"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

export default function LoginPage() {
    const router = useRouter();
    const queryClient = useQueryClient(); // ✅ important

    // ✅ form state
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // ✅ handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ==========================
    // ✅ LOGIN MUTATION
    // ==========================
    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            return await api.post("/api/v1/auth/login", data);
        },

        onSuccess: async (res) => {
            console.log("LOGIN RESPONSE:", res.data);

            const user = res?.data?.data; // ✅ correct

            // 🔥 REFRESH USER (VERY IMPORTANT)
            await queryClient.invalidateQueries(["me"]);

            // ✅ ROLE BASED REDIRECT
            if (user?.role === "doctor") {
                router.push("/doctor/dashboard");
            } else {
                router.push("/book-appointment");
            }
        },

        onError: (err) => {
            console.log("Login error:", err.response?.data || err.message);
        },
    });

    // ✅ handle submit
    const handleLogin = (e) => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
            >
                <h2 className="text-xl font-bold text-center text-green-600">
                    Login 🌿
                </h2>

                {/* Email */}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}