import {createContext, ReactNode, useContext, useState} from "react";
import {useLocalStorage} from "hooks/useLocalStorage";
import {MENU_OPEN_KEY} from "constants/layout";


type Props = {
    children: ReactNode;
}

export type ConfigContext = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    menuAtivo: string;
    setMenuAtivo: (menuAtivo: string) => void;
}

const ConfigContextType = createContext<ConfigContext>({} as ConfigContext);

const ConfigProvider = ({children}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useLocalStorage<boolean>(MENU_OPEN_KEY);
    const [menuAtivo, setMenuAtivo] = useState<string>("");

    return (
        <ConfigContextType.Provider value={{isLoading, setIsLoading, isOpen, setIsOpen, menuAtivo, setMenuAtivo}}>
            {children}
        </ConfigContextType.Provider>
    );
}

export default ConfigProvider;

export const useConfig = () => useContext(ConfigContextType);