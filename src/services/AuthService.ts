import queryString from "query-string";
import {CLIENT_ID, CLIENT_SECRET} from "constants/auth";
import {API} from "./Api";
import {LoginResponse, TokenDecoded} from "types/auth";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";
import {useConfig} from "contexts/ConfigContext";

const url = "oauth";

const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
}

const useAuthService = () => {
    const {setIsLoading} = useConfig();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        const data = queryString.stringify({
            username: email,
            password,
            grant_type: 'password',
        });
        return await API.post(`${url}/token`, data, {headers})
            .then((response: AxiosResponse<LoginResponse>) => response.data)
            .catch((error) => {
                if (error.response.data.error === "invalid_grant") {
                    toast.error("Invalid email or password");
                    throw error.code;
                } else {
                    toast.error(error.response.data.error_description);
                    throw error.code;
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const refreshToken = async (refreshToken: string) => {
        const data = queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        return await API.post(`${url}/token`, data, {headers})
            .then((res: AxiosResponse<LoginResponse>) => res.data)
            .catch((err) => {
                toast.error(err.response.data.error_description);
                throw err.code;
            }).finally(() => setIsLoading(false));
    }
    const verifyToken = async (token: string) => {
        const data = queryString.stringify({
            token,
        });
        return await API.post(`${url}/check_token`, data, {headers})
            .then((res: AxiosResponse<TokenDecoded>) => res.data)
            .catch((err) => {
                toast.error(err.response.data.error_description);
                throw err.code;
            }).finally(() => setIsLoading(false));
    }

    return {
        login,
        refreshToken,
        verifyToken,
    }

}

export default useAuthService;