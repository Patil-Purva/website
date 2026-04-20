"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "react-toastify";

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await api.get("/api/v1/appointments");
            setAppointments(res.data.data);
        } catch {
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    // 🎨 Status badge
    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    // ⏰ Format time
    const formatTime = (time) => {
        const [h, m] = time.split(":");
        const hour = parseInt(h);
        const ampm = hour >= 12 ? "PM" : "AM";
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

    // ❌ Cancel Logic
    const handleCancel = async (id, status) => {
        if (status !== "pending") {
            return toast.error(
                "You cannot cancel after doctor confirmation"
            );
        }

        try {
            await api.patch(`/api/v1/cancel-appointment/${id}`);
            toast.success("Appointment cancelled successfully");
            fetchAppointments();
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Cancel failed"
            );
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (!appointments.length) {
        return (
            <p className="text-center text-gray-500">
                No appointments found 😔
            </p>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {appointments.map((item) => {
                const isPast = new Date(item.date) < new Date();

                return (
                    <div
                        key={item._id}
                        className={`group relative rounded-3xl p-[1px] bg-gradient-to-br from-green-200 to-green-100 shadow-lg hover:shadow-2xl transition`}
                    >
                        {/* Glass Card */}
                        <div className={`bg-white rounded-3xl p-6 h-full transition ${isPast ? "opacity-60" : ""
                            }`}>

                            {/* STATUS */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    🩺 Dr. Prasad Sangar
                                </h3>

                                <span
                                    className={`text-xs px-3 py-1 rounded-full font-semibold ${statusStyle[item.status] || "bg-gray-100"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </div>

                            {/* INFO */}
                            <div className="space-y-3 text-sm text-gray-600">

                                <div className="flex items-center gap-2">
                                    📅
                                    <span>
                                        {new Date(item.date).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            }
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    ⏰ <span>{formatTime(item.timeSlot)}</span>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-6 pt-4 border-t flex justify-between items-center">

                                <span className="text-xs text-gray-400">
                                    Booked on{" "}
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>

                                <button
                                    onClick={() =>
                                        handleCancel(item._id, item.status)
                                    }
                                    disabled={
                                        item.status !== "pending" || isPast
                                    }
                                    className={`px-4 py-2 text-xs rounded-full font-semibold transition ${item.status === "pending" && !isPast
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Cancel
                                </button>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}