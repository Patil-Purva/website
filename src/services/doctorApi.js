import api from "./api";

const doctorApi = {
    getAppointments: () =>
        api.get("/api/v1/doctor/appointments"),

    updateStatus: (id, status) =>
        api.patch(`/api/v1/doctor/appointment/${id}`, { status }),
};

export default doctorApi;