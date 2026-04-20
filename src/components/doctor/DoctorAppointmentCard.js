"use client";

import { toast } from "react-toastify";

export default function DoctorAppointmentCard({ appointment, onUpdate }) {
    const { _id, userId, date, timeSlot, status, address } = appointment;

    const isPending = status === "pending";

    const formatDate = new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formatTime = (time) => {
        const [h, m] = time.split(":");
        const hour = parseInt(h);
        const ampm = hour >= 12 ? "PM" : "AM";
        return `${hour % 12 || 12}:${m} ${ampm}`;
    };

    const statusColor = {
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="relative bg-white rounded-3xl shadow-xl border border-green-100 p-6 hover:shadow-2xl transition duration-300">

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-200/20 to-green-100/10 blur-xl"></div>

            <div className="relative z-10">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        🧑 {userId?.name || "Patient"}
                    </h3>

                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${statusColor[status]}`}>
                        {status}
                    </span>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm text-gray-600">
                    <p>📅 <b>{formatDate}</b></p>
                    <p>⏰ <b>{formatTime(timeSlot)}</b></p>
                    <p>📍 {address}</p>
                </div>

                {/* Divider */}
                <div className="my-4 border-t"></div>

                {/* Actions */}
                <div className="flex gap-3">

                    <button
                        disabled={!isPending}
                        onClick={() => onUpdate(_id, "confirmed")}
                        className={`flex-1 py-2 rounded-xl font-medium transition 
                        ${isPending
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Confirm
                    </button>

                    <button
                        disabled={!isPending}
                        onClick={() => onUpdate(_id, "rejected")}
                        className={`flex-1 py-2 rounded-xl font-medium transition 
                        ${isPending
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Reject
                    </button>

                </div>
            </div>
        </div>
    );
}