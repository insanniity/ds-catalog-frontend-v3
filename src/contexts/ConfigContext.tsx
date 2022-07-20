import {createContext, ReactNode, useContext, useState} from "react";


type Props = {
    children: ReactNode;
}

export type ConfigContext = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const ConfigContextType = createContext<ConfigContext>({} as ConfigContext);

const ConfigProvider = ({children}: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ConfigContextType.Provider value={{isLoading, setIsLoading}}>
            {children}
        </ConfigContextType.Provider>
    );
}

export default ConfigProvider;

export const useConfig = () => useContext(ConfigContextType);