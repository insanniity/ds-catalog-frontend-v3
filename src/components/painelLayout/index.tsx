import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Copyright from "components/copyrights";
import {Navigate, Outlet} from "react-router-dom";
import {AppBar, Drawer} from "assets/styled"
import SideMenu from "components/sideMenu";
import {useConfig} from "contexts/ConfigContext";
import MyLoading from "components/myLoading";
import AuthMenu from "components/authMenu";
import {useAuth} from "contexts/AuthContext";


const PainelLayout = () => {
    const {isOpen, setIsOpen, menuAtivo} = useConfig();
    const {verifyAuthentication} = useAuth();

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return !verifyAuthentication() ? <Navigate to={"/auth/login"} replace/> :(
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={isOpen}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(isOpen && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {menuAtivo}
                    </Typography>
                    <AuthMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={isOpen}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <SideMenu />
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <MyLoading />
                <Container maxWidth="lg" sx={{ my: 4 }}>
                    <Outlet />
                </Container>
                <Copyright sx={{ pt: 4 }} />
            </Box>
        </Box>
    );
}

export default PainelLayout;