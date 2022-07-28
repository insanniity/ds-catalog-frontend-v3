import axios, {AxiosRequestConfig} from "axios";
import {AUTH_KEY, BASE_URL} from "constants/auth";
import {ls} from "hooks/useLocalStorage";
import {LoginResponse} from "types/auth";


const axiosInstance = axios.create({baseURL: BASE_URL});
const authData = ls.get(AUTH_KEY) as LoginResponse;

if (authData) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`;
}

export const API = {
    get: (url: string, config?: AxiosRequestConfig) => {
        return axiosInstance.get(url, config);
    },
    post: (url: string, data: any, config?: AxiosRequestConfig) => {
        return axiosInstance.post(url, data, config);
    },
    put: (url: string, data: any, config?: AxiosRequestConfig) => {
        return axiosInstance.put(url, data, config)
    },
    delete: (url: string, config?: AxiosRequestConfig)  => {
        return axiosInstance.delete(url, config);
    },
}
