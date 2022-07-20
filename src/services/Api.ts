import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL} from "constants/auth";


const axiosInstance = axios.create({baseURL: BASE_URL});

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
