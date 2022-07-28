import {ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme} from "@mui/material";
import {useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {useConfig} from "contexts/ConfigContext";
import {ReactNode, useEffect} from "react";

type Props = {
    icon: ReactNode;
    text: string;
    link: string;
}


const MenuItem = ({icon, text, link} : Props) => {
    const {isOpen, setIsOpen, setMenuAtivo} = useConfig();
    const navigate = useNavigate();
    let resolved = useResolvedPath(link);
    let match = useMatch({ path: resolved.pathname, end: false});
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down("sm"));


    useEffect(() => {
        if (match) setMenuAtivo(text);
    }, [match, setMenuAtivo, text]);

    return (
        <ListItem disablePadding sx={{display: "block", textDecoration: 'ImageListItem'}} onClick={() => {
            if(sm) setIsOpen(false);
            navigate(link)
        }} >
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? "initial" : "center",
                    px: 2.5,
                }}
                selected={!!match}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: isOpen ? 3 : "auto",
                        justifyContent: "center",
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{opacity: isOpen ? 1 : 0}} />
            </ListItemButton>
        </ListItem>
    );
}

export default MenuItem;