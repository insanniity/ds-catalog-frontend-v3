import {Box, Button, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useConfig} from "contexts/ConfigContext";
import CircularProgress from '@mui/material/CircularProgress';
import {useAppDispatch} from "store/store";

import {login} from "store/slices/authSlices";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


type FormState = {
    username: string;
    password: string;
}

const FormLogin = () => {
    const {register,handleSubmit,formState: {errors}} = useForm<FormState>({defaultValues: {username: 'maria@gmail.com', password: '123456'}});
    const {isLoading, setIsLoading} = useConfig();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = ({username, password}: FormState) => {
        try {
            setIsLoading(true);
            dispatch(login(username, password)).finally(() => setIsLoading(false));
            navigate('/painel/home', {replace: true, state: {from: location}});
        }catch (e:any) {
            toast.error(e);
        }
        // signIn(username, password);
    };

    return isLoading ?
        (
            <Box sx={{display: 'flex', mt: 5}} >
                <CircularProgress size={100}/>
            </Box>
        ) : (
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 1}}>
                <TextField
                    {...register('username', {required: true})}
                    margin="normal"
                    error={!!errors.username}
                    required
                    fullWidth
                    label="E-mail"
                    autoComplete="email"
                    autoFocus
                    helperText={errors.username?.message}
                />
                <TextField
                    {...register('password', {required: true})}
                    margin="normal"
                    required
                    fullWidth
                    label="Senha"
                    type="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox color="primary"/>}*/}
                {/*    label="Lembrar me"*/}
                {/*    value={rememberMe}*/}
                {/*    onClick={(e:any) => {*/}
                {/*        setRememberMe(e.target.checked)*/}
                {/*    }}*/}
                {/*/>*/}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Entrar
                </Button>
            </Box>
        );
}

export default FormLogin;