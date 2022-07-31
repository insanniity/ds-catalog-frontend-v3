import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import MenuItem from "components/sideMenu/menuItem";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GroupIcon from '@mui/icons-material/Group';

const SideMenu = () => {
    return (
        <List component="nav">
            <MenuItem icon={<DashboardIcon />} text="Dashboard" link="/painel/home" roles={["ROLE_ADMIN", "ROLE_OPERATOR"]}/>
            <MenuItem icon={<GroupIcon />} text="Usuarios" link="/painel/users" roles={["ROLE_ADMIN"]} />
            <MenuItem icon={<LocalOfferIcon />} text="Categorias" link="/painel/categories" roles={["ROLE_ADMIN", "ROLE_OPERATOR"]} />
        </List>
    )
}

export default SideMenu;