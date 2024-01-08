import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const BASE_URL = API_BASE_URL;

const Axios = axios.create({
    baseURL: BASE_URL,
    timeout: 5000000,
});

Axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

Axios.interceptors.response.use(
    response => response,
    error => {
        const errMsg = "Something went wrong. Please try again later.";
        if (error?.response?.status === 401 || error?.response?.status === 403) {
        }
        if (!error.message) error.message = errMsg;
        return Promise.reject(error);
    }
);

export class HttpClient {
    static async get(url, params) {
        const response = await Axios.get(url, { params });
        return response.data;
    }

    static async post(url, data, options) {
        const response = await Axios.post(url, data, options);
        return response.data;
    }

    static async patch(url, data) {
        const response = await Axios.patch(url, data);
        return response.data;
    }

    static async delete(url) {
        const response = await Axios.delete(url);
        return response.data;
    }
}
