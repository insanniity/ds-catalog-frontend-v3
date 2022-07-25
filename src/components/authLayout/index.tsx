import {Grid, Paper} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {useAuth} from "contexts/AuthContext";


const AuthLayout = () => {
    const {verifyAuthentication} = useAuth();

    return verifyAuthentication() ? <Navigate to={"/painel/home"} replace /> : (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}

export default AuthLayout;