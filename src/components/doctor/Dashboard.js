"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/api/v1/doctor/dashboard");
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    // 🇮🇳 CURRENT INDIA TIME (ONCE, NOT INSIDE LOOP)
    const now = new Date();
    const indiaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const currentMinutes =
        indiaTime.getHours() * 60 + indiaTime.getMinutes();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <Card title="Total Patients" value={data?.totalPatients} color="bg-blue-500" />
                <Card title="Today Remaining" value={data?.todayAppointments} color="bg-purple-500" />
                <Card title="Pending" value={data?.pending} color="bg-yellow-500" />
                <Card title="Confirmed" value={data?.completed} color="bg-green-500" />
            </div>

            {/* ================= TODAY APPOINTMENTS ================= */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-5">
                    Today’s Appointments
                </h2>

                {data?.appointments?.length === 0 ? (
                    <p className="text-gray-400 text-sm">
                        No appointments today
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.appointments.map((appt) => {

                            // ⏱ Convert appointment time to minutes
                            const [hour, minute] = appt.time.split(":").map(Number);
                            const apptMinutes = hour * 60 + minute;

                            const isPast = apptMinutes < currentMinutes;

                            return (
                                <div
                                    key={appt._id}
                                    className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition"
                                >
                                    {/* TIME + STATUS */}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-semibold text-gray-700">
                                            {formatTime(appt.time)} {/* ✅ IST FORMAT */}
                                        </span>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-semibold ${isPast
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {isPast ? "Done" : "Upcoming"}
                                        </span>
                                    </div>

                                    {/* PATIENT */}
                                    <p className="font-medium text-gray-800">
                                        {appt.patientName}
                                    </p>

                                    {/* STATUS TEXT */}
                                    <div className="mt-3 flex items-center gap-2">
                                        <span
                                            className={`w-2.5 h-2.5 rounded-full ${isPast ? "bg-gray-400" : "bg-green-500"
                                                }`}
                                        ></span>
                                        <span className="text-xs text-gray-500">
                                            {isPast ? "Completed" : "Waiting"}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ================= TIME FORMAT FUNCTION ================= */

function formatTime(time) {
    const [hour, minute] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

/* ================= CARD ================= */

function Card({ title, value, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition">
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold mt-1">
                    {value || 0}
                </h2>
            </div>
            <div className={`${color} w-10 h-10 rounded-xl`}></div>
        </div>
    );
}