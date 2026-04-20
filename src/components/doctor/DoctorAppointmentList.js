"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import doctorApi from "@/services/doctorApi";
import DoctorAppointmentCard from "./DoctorAppointmentCard";

export default function DoctorAppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await doctorApi.getAppointments();
            setAppointments(res.data.data);
        } catch (err) {
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleUpdate = async (id, status) => {
        try {
            await doctorApi.updateStatus(id, status);

            toast.success(`Appointment ${status}`);

            fetchAppointments(); // 🔥 refresh UI
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Action failed"
            );
        }
    };

    if (loading) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading appointments...
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                No appointments found 😔
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((item) => (
                <DoctorAppointmentCard
                    key={item._id}
                    appointment={item}
                    onUpdate={handleUpdate}
                />
            ))}
        </div>
    );
}