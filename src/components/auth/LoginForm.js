"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuthStore();
    const router = useRouter();

    // ✅ form state
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // ✅ handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ handle submit
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(form); // 🔥 dynamic data
            router.push("/appointment");
        } catch (err) {
            console.log("Login error:", err);
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}