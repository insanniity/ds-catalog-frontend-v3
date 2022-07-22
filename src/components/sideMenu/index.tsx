import DashboardIcon from "@mui/icons-material/Dashboard";
import List from "@mui/material/List";
import MenuItem from "components/sideMenu/menuItem";

const SideMenu = () => {
    return (
        <List component="nav">
            <MenuItem icon={<DashboardIcon />} text="Dashboard" link="/painel/home" />
        </List>
    )
}

export default SideMenu;