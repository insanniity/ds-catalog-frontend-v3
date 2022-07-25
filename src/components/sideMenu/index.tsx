import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import MenuItem from "components/sideMenu/menuItem";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const SideMenu = () => {
    return (
        <List component="nav">
            <MenuItem icon={<DashboardIcon />} text="Dashboard" link="/painel/home" />
            <MenuItem icon={<LocalOfferIcon />} text="Categorias" link="/painel/categories" />
        </List>
    )
}

export default SideMenu;