import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {Authorities, LoginResponse, TokenDecoded} from "types/auth";
import {useLocalStorage} from "hooks/useLocalStorage";
import {AUTH_KEY, REMEMBER_ME_KEY} from "constants/auth";
import useAuthService from "services/AuthService";
import {useConfig} from "contexts/ConfigContext";
import jwt_decode from "jwt-decode";


type Props = {
    children: ReactNode;
}

export type AuthContext = {
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    isSignedIn: boolean;
    name: string;
    rememberMe: boolean;
    setRememberMe: (rememberMe: boolean) => void;
    hasAnyRoles: (roles: Authorities[]) => boolean;
}


const AuthContextType = createContext<AuthContext>({} as AuthContext);


const AuthProvider = ({children}: Props) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [authData, setAuthData] = useLocalStorage<LoginResponse>(AUTH_KEY);
    const [rememberMe, setRememberMe] = useLocalStorage<boolean>(REMEMBER_ME_KEY);
    const {refreshToken, login} = useAuthService();
    const [name, setName] = useState('')
    const {setIsLoading} = useConfig();


    const hasAnyRoles = (roles:Authorities[]):boolean => {
        const tokenData = jwt_decode<TokenDecoded>(authData.access_token);
        if(roles.length === 0 ) return false;
        if(tokenData !== undefined){
            return roles.some(role => tokenData.authorities.includes(role));
        }
        return false;
    }

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        const res = await login(email, password);
        setAuthData(res);
        setName(res.name);
        setIsSignedIn(true);
        setIsLoading(false);
    }

    const signOut = useCallback(async () => {
        setIsLoading(true);
        setAuthData({} as LoginResponse);
        setName('');
        setIsSignedIn(false);
        setIsLoading(false);
    }, [setAuthData, setIsLoading])

    const verifyAuthentication = useCallback(() => {
        if (authData.access_token) {
            const {exp} = jwt_decode<TokenDecoded>(authData.access_token);
            return (exp * 1000 > Date.now());
        }
        return false;
    }, [authData])

    useEffect(() => {
        if (authData && authData.access_token && !isSignedIn) {
            setIsSignedIn(verifyAuthentication());
            setName(authData.name);
        }
    }, [authData, isSignedIn, setIsLoading, verifyAuthentication]);


    useEffect(() => {
        if (rememberMe && authData && (authData.expires_in * 1000 > (Date.now()-86400))) {
            refreshToken(authData.refresh_token)
                .then(res => {
                    setAuthData(res);
                })
                .catch(async () => {
                    await signOut();
                });
        }
    }, [authData, refreshToken, rememberMe, setAuthData, signOut, verifyAuthentication]);




    return (
        <AuthContextType.Provider value={{signIn, signOut, isSignedIn, name, rememberMe, setRememberMe, hasAnyRoles}}>
            {children}
        </AuthContextType.Provider>
    );
}


export default AuthProvider;

export const useAuth = () => useContext(AuthContextType);