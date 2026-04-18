"use client";
import { useEffect, useState } from "react";
import { getMyAppointments } from "@/services/bookingService";
import AppointmentCard from "./appointment-card";
import { toast } from "react-toastify";

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getMyAppointments();
                setAppointments(data);
            } catch (err) {
                toast.error("Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // 🔄 Loading state
    if (loading) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading appointments...
            </div>
        );
    }

    // ❌ Empty state
    if (appointments.length === 0) {
        return (
            <div className="text-center mt-10 text-gray-500">
                No appointments found.
            </div>
        );
    }

    // ✅ Show cards
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} />
            ))}
        </div>
    );
}