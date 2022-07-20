import {Avatar, Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormLogin from "components/formLogin";

const Login = () => {
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                height: mdUp ? '45rem' : 'auto',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Logar
            </Typography>
            <FormLogin />
        </Box>
    );
}

export default Login;