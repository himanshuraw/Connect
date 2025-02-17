import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const publicAPI: AxiosInstance = axios.create({
    baseURL: BASE_URL,
})

export const privateAPI: AxiosInstance = axios.create({
    baseURL: BASE_URL
})

privateAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})