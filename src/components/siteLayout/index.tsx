import {AppBar, Box, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";

const SiteLayout = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{backgroundColor: (t) => t.palette.grey[100], height: "100vh"}}>
            <AppBar position='static' color='primary'>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Stack direction='row' spacing={2} justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }} >
                        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                            DS
                        </IconButton>
                        <Typography variant='h6' component='div' >
                            Catalog
                        </Typography>
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent="center" alignItems="center"  sx={{ flexGrow: 1 }}>
                        <Button color='inherit' onClick={() => navigate('/')}>Home</Button>
                        <Button color='inherit'>Catalogo</Button>
                        <Button color='inherit' variant={"outlined"} sx={{px:3}} onClick={() => navigate('/auth/login')}>Login</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
}

export default SiteLayout;

