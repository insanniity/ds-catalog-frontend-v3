import axios, {AxiosRequestConfig} from "axios";
import {AUTH_KEY, BASE_URL} from "constants/auth";
import {ls} from "hooks/useLocalStorage";
import {LoginResponse} from "types/auth";


const axiosInstance = axios.create({baseURL: BASE_URL});
const authData = ls.get(AUTH_KEY) as LoginResponse;

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

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    if (authData && authData.access_token && config) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${authData.access_token}`,
        }
        // axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`;
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // if(error.response.status === 401) history.push('/auth/login');
    return Promise.reject(error);
});