import api from "@/services/api";

export const getMyAppointments = async () => {
    const res = await api.get("/api/v1/appointments"); // your backend route
    return res.data.data;
};