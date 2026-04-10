"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const menu = [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "About Us", path: "/about" },
        { name: "Our Book", path: "/books" },
        { name: "Courses", path: "/courses" },
        { name: "Videos", path: "/videos" },
        { name: "Book Appointment", path: "/appointment" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-green-600 text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center relative">

                {/* Logo */}
                <h1 className="text-xl font-bold">Ayurvedic 🌿</h1>

                {/* ✅ DESKTOP MENU (IMPORTANT FIX) */}
                <div className="hidden md:flex items-center gap-6">
                    {menu.map((item, i) => (
                        <Link key={i} href={item.path}>
                            {item.name}
                        </Link>
                    ))}

                    {/* ✅ LOGIN + SIGNUP HERE */}
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
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

                {/* ✅ MOBILE DROPDOWN */}
                {open && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col gap-3 md:hidden">

                        {menu.map((item, i) => (
                            <Link key={i} href={item.path} onClick={() => setOpen(false)}>
                                {item.name}
                            </Link>
                        ))}

                        <hr />

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
                    </div>
                )}
            </div>
        </nav>
    );
}