import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((req) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            req.headers.authorization = `Bearer ${token}`;
        }
    }
    return req;
});

export default axiosInstance;
