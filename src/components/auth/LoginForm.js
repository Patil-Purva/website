"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function LoginPage() {
    const router = useRouter();

    const loginUser = useAuthStore((state) => state.login);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // ✅ Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await api.post("/api/v1/auth/login", form);

            const userData = res?.data?.data;

            // ✅ Save user in Zustand
            loginUser(userData);

            // ✅ Success toast
            toast.success("Login successful 🎉");

            // ✅ Redirect based on role
            if (userData.role === "doctor") {
                router.replace("/doctor/dashboard");
            } else {
                router.replace("/book-appointment");
            }

        } catch (err) {
            console.log("Login Error:", err);

            // ✅ Error toast
            toast.error(
                err?.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
            >
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-600">
                        Login 🌿
                    </h2>

                    <p className="text-gray-500 mt-2 text-sm">
                        Welcome back! Please login to continue.
                    </p>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}