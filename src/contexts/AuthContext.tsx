import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {LoginResponse, TokenDecoded} from "types/auth";
import {useLocalStorage} from "hooks/useLocalStorage";
import {AUTH_KEY, REMEMBER_ME_KEY} from "constants/auth";
import useAuthService from "services/AuthService";
import {useConfig} from "contexts/ConfigContext";


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
}


const AuthContextType = createContext<AuthContext>({} as AuthContext);


const AuthProvider = ({children}: Props) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [authData, setAuthData] = useLocalStorage<LoginResponse>(AUTH_KEY);
    const [rememberMe, setRememberMe] = useLocalStorage<boolean>(REMEMBER_ME_KEY, false);
    const {verifyToken, refreshToken, login} = useAuthService();
    const [name, setName] = useState('')
    const {setIsLoading} = useConfig();


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

    useEffect(() => {
        if (authData && authData.access_token  && !isSignedIn) {
            setIsLoading(true);
            verifyToken(authData.access_token)
                .then(async (res: TokenDecoded) => {
                    if (res.exp > Date.now() / 1000) {
                        setIsSignedIn(true);
                        setName(authData.name);
                    } else {
                        await signOut();
                    }
                })
                .catch(async () => {
                    await signOut();
                })
                .finally(() => {
                    setIsLoading(false);
            });
        }
    }, [authData, isSignedIn, setIsLoading, signOut, verifyToken]);


    useEffect(() => {
        if (rememberMe && authData) {
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
        <AuthContextType.Provider value={{signIn, signOut, isSignedIn, name, rememberMe, setRememberMe}}>
            {children}
        </AuthContextType.Provider>
    );
}


export default AuthProvider;

export const useAuth = () => useContext(AuthContextType);