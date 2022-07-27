import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {Authorities, LoginResponse, TokenDecoded} from "types/auth";
import {useLocalStorage} from "hooks/useLocalStorage";
import {AUTH_KEY, REMEMBER_ME_KEY} from "constants/auth";
import useAuthService from "services/AuthService";
import {useConfig} from "contexts/ConfigContext";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";


type Props = {
    children: ReactNode;
}

export type AuthContext = {
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    verifyAuthentication: () => boolean;
    name: string;
    rememberMe: boolean;
    setRememberMe: (rememberMe: boolean) => void;
    hasAnyRoles: (roles: Authorities[]) => boolean;
    authData: LoginResponse;
}


const AuthContextType = createContext<AuthContext>({} as AuthContext);


const AuthProvider = ({children}: Props) => {
    const [authData, setAuthData] = useLocalStorage<LoginResponse>(AUTH_KEY);
    const [rememberMe, setRememberMe] = useLocalStorage<boolean>(REMEMBER_ME_KEY);
    const {refreshToken, login} = useAuthService();
    const [name, setName] = useState('')
    const {setIsLoading} = useConfig();
    const navigate = useNavigate();

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
        setIsLoading(false);
        navigate('/painel/home');
    }

    const signOut = useCallback(async () => {
        setIsLoading(true);
        setAuthData({} as LoginResponse);
        setName('');
        setIsLoading(false);
        navigate('/auth/login');
    }, [navigate, setAuthData, setIsLoading])

    const verifyAuthentication = ():boolean => {
        if (authData && authData.access_token) {
            const {exp} = jwt_decode<TokenDecoded>(authData.access_token);
            return (exp * 1000 > Date.now());
        }
        return false;
    }

    useEffect(() => {
        if (authData && authData.access_token) {
            setName(authData.name);
        }
    }, [authData]);
    
    useEffect(() => {
        if (!authData) {
            navigate('/auth/login');
        }
    }, [authData, navigate]);

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
    }, [authData, refreshToken, rememberMe, setAuthData, signOut]);




    return (
        <AuthContextType.Provider value={{signIn, signOut, verifyAuthentication, name, rememberMe, setRememberMe, hasAnyRoles, authData}}>
            {children}
        </AuthContextType.Provider>
    );
}


export default AuthProvider;

export const useAuth = () => useContext(AuthContextType);