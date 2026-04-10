import api from "./api";

export const getTestData = async () => {
    const res = await api.get("/api/test");
    return res.data;
};