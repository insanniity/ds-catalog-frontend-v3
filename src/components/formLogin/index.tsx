import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useConfig} from "contexts/ConfigContext";
import CircularProgress from '@mui/material/CircularProgress';
import AuthService from "services/AuthService";

type FormState = {
    username: string;
    password: string;
}

const FormLogin = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormState>({defaultValues: {username: 'alex@gmail.com', password: '123456'}});
    const {isLoading, setIsLoading} = useConfig();

    const onSubmit = async ({username, password}: FormState) => {
        setIsLoading(true);
        const res = await AuthService.login(username, password);
        console.log(res);
        setIsLoading(false);
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
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Lembrar me"
                />
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