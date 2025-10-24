import axios from "axios";

const AxiosUserInstanse = axios.create({
    baseURL: `https://kashop1.runasp.net/api/Customer`
});

// Add request interceptor to set token dynamically
AxiosUserInstanse.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default AxiosUserInstanse;