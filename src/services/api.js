import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // ✅ IMPORTANT
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (
            originalRequest.url.includes("/auth/refresh") ||
            originalRequest.url.includes("/auth/logout") ||
            originalRequest.url.includes("/auth/me")
        ) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.post(
                    "http://localhost:5000/api/v1/auth/refresh",
                    {},
                    { withCredentials: true }
                );

                return api(originalRequest);
            } catch (err) {
                // ✅ IMPORTANT
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;