import queryString from "query-string";
import {CLIENT_ID, CLIENT_SECRET} from "constants/auth";
import {API} from "./Api";
import {LoginResponse, TokenDecoded} from "types/auth";
import {AxiosResponse} from "axios";
import {toast} from "react-toastify";

const url = "oauth";

const AuthService = {
    login: async (email: string, password: string) : Promise<LoginResponse> => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
        }
        const data = queryString.stringify({
            username: email,
            password,
            grant_type: 'password',
        });
        return await API.post(`${url}/token`, data, {headers})
            .then((res: AxiosResponse) => res.data)
            .catch((err) => {
                if(err.response.data.error === "invalid_grant") {
                    toast.error("Invalid email or password");
                }else{
                    toast.error(err.response.data.error_description);
                }
            })
    },
    refreshToken: async (refreshToken: string) : Promise<LoginResponse> => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
        }
        const data = queryString.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
        return await API.post(`${url}/token`, data, {headers})
            .then((res: AxiosResponse) => res.data)
            .catch((err) => {
                toast.error(err.response.data.error_description);
                throw err;
            })
    },
    verifyToken: async (token: string) : Promise<TokenDecoded> => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
        }
        const data = queryString.stringify({
            token,
        });
        return await API.post(`${url}/check_token`, data, {headers})
            .then((res: AxiosResponse) => res.data)
            .catch((err) => {
                toast.error(err.response.data.error_description);
            })
    }
}

export default AuthService;