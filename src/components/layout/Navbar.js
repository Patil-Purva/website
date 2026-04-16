"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // ✅ Zustand state
    const user = useAuthStore((state) => state.user);
    const logoutUser = useAuthStore((state) => state.logout);

    // ✅ Logout handler
    const handleLogout = async () => {
        try {
            await api.post("/api/v1/auth/logout"); // server logout
        } catch (error) {
            console.log("Logout API error:", error);
        } finally {
            logoutUser(); // clear Zustand state
            router.push("/login");
        }
    };

    let menu = [];

    // 🔓 PUBLIC
    if (!user) {
        menu = [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "About Us", path: "/about" },
            { name: "Our Book", path: "/books" },
            { name: "Courses", path: "/courses" },
            { name: "Videos", path: "/videos" },
            { name: "Book Appointment", path: "/login" },
            { name: "Contact", path: "/contact" },
        ];
    }

    // 👤 USER
    if (user?.role === "user") {
        menu = [
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Book Appointment", path: "/book-appointment" },
            { name: "My Appointments", path: "/my-appointments" },
        ];
    }

    // 👨‍⚕️ DOCTOR
    if (user?.role === "doctor") {
        menu = [
            { name: "Dashboard", path: "/doctor/dashboard" },
            { name: "Appointments", path: "/doctor/appointments" },
            { name: "Patients", path: "/doctor/patients" },
        ];
    }

    return (
        <nav className="bg-green-600 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center relative">

                <h1
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    Ayurvedic 🌿
                </h1>

                <div className="hidden md:flex items-center gap-6">

                    {menu.map((item, i) => (
                        <Link key={i} href={item.path}>
                            {item.name}
                        </Link>
                    ))}

                    {!user && (
                        <>
                            <Link href="/login">
                                <button className="px-4 py-1.5 border border-white rounded">
                                    Login
                                </button>
                            </Link>

                            <Link href="/signup">
                                <button className="px-4 py-1.5 bg-white text-green-600 rounded font-semibold">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    {user && (
                        <>
                            <span className="font-semibold">
                                {user.role === "doctor"
                                    ? `Dr. ${user.name}`
                                    : `Welcome, ${user.name}`}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-1.5 bg-red-500 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                {open && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">

                        {menu.map((item, i) => (
                            <Link key={i} href={item.path} onClick={() => setOpen(false)}>
                                {item.name}
                            </Link>
                        ))}

                        <hr />

                        {!user && (
                            <>
                                <Link href="/login">
                                    <button className="w-full border border-green-600 text-green-600 py-2 rounded">
                                        Login
                                    </button>
                                </Link>

                                <Link href="/signup">
                                    <button className="w-full bg-green-600 text-white py-2 rounded">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <span className="text-green-600 font-semibold text-center">
                                    {user.role === "doctor"
                                        ? `Dr. ${user.name}`
                                        : `Welcome, ${user.name}`}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-red-500 text-white py-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}