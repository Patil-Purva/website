import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        // ✅ Skip refresh + logout
        if (
            originalRequest.url.includes("/auth/refresh") ||
            originalRequest.url.includes("/auth/logout")
        ) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {

            // 🔁 If already refreshing → queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // ✅ FIX: use GET (your backend expects cookies)
                await api.post("/api/v1/auth/refresh");

                processQueue(null);
                isRefreshing = false;

                return api(originalRequest); // retry original

            } catch (refreshError) {
                processQueue(refreshError);
                isRefreshing = false;

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;