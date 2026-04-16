"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                // 🔥 Protected API (TRIGGERS REFRESH)
                const res = await api.get("/api/v1/doctor/dashboard");

                console.log("Dashboard Data:", res.data);

            } catch (error) {
                console.log("Error:", error.response?.data || error.message);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (!user) return <p className="text-center mt-10">Redirecting...</p>;

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-green-600">
                Doctor Dashboard 👨‍⚕️
            </h1>

            <p className="mt-4">Welcome, Dr. {user.name}</p>
        </div>
    );
}