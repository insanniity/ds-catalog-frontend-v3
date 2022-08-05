import {Grid, Paper} from "@mui/material";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {useAuth} from "store/slices/authSlices";

type States = {
    from: {
        pathname: string;
        hash: string;
        search: string;
        key: string;
        state: any;
    };
}

const AuthLayout = () => {
    const auth = useSelector(useAuth);
    const location = useLocation();
    const {from} = location.state as States;
    const fromLocation = from ? from.pathname : "/painel/home";
    // const { from } = location.state || { from: { pathname: "/admin" } };
    // const from =  "/painel/home"

    return auth.authenticated ? <Navigate to={fromLocation} replace /> : (
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