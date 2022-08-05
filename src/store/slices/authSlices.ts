import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Authorities, LoginResponse, TokenDecoded} from "types/auth";
import queryString from "query-string";
import {AUTH_KEY, CLIENT_ID, CLIENT_SECRET} from "constants/auth";
import {API} from "services/Api";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";
import {ls} from "hooks/useLocalStorage";


const url = "/oauth";

const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`
}

const initialState:LoginResponse = {
    access_token: null,
    token_type: null,
    refresh_token: null,
    expires_in: null,
    scope: null,
    name: null,
    authenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action:PayloadAction<LoginResponse>) => {
            ls.set(AUTH_KEY, action.payload);
            return  action.payload;
        },
        logout: () => {
            return initialState;
        },
        setAuthenticated: (state, action:PayloadAction<boolean>) => {
            return {...state, authenticated: action.payload};
        }
    }
})

export default authSlice.reducer;

export const {setCredentials, logout} = authSlice.actions;

export const useAuth = (state:any) => {
    return state.auth as LoginResponse;
}

export const login = (username:string, password:string) => async (dispatch: any) => {
    const data = queryString.stringify({
        username: username,
        password,
        grant_type: 'password',
    });
    try{
        const response = await API.post(`${url}/token`, data, {headers})
        dispatch(setCredentials({...response.data, authenticated: isAuthenticated(response.data.access_token)}));
    }catch(e){
        toast.error("Invalid email or password");
        dispatch(logout());
    }
}

const isAuthenticated = (token:string) => {
    if (token) {
        const {exp} = jwt_decode<TokenDecoded>(token);
        return (exp * 1000 > Date.now());
    }
    return false;
};


export const hasAuthority = (state:any, roles?:Authorities[]) => {
    if (!roles) return false;
    if(roles.length === 0 ) return false;
    if (state.auth && state.auth.access_token) {
        const {authorities} = jwt_decode<TokenDecoded>(state.auth.access_token);
        return roles.some(role => authorities.includes(role));
    }
    return false;
}
