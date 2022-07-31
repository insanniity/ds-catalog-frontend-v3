import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useNavigate} from "react-router-dom";
import {User} from "types/user";
import {createUser} from "store/slices/userSlices";
import {
    Box,
    Button, Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import CardContainer from "components/cardContainer";
import {useSelector} from "react-redux";
import {getRoles, useRole} from "store/slices/roleSlices";
import {useEffect, useState} from "react";

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    enabled: string;
    password: string;
    confirmPassword: string;
    roles: string[];
}

const AddUsers = () => {
    const { register, handleSubmit, formState: { errors }, control, getValues } = useForm<FormState>({defaultValues: {}});
    const rolesItems = useSelector(useRole)
    const [optionsSelected, setOptionsSelected] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getRoles())
        setIsLoading(false)
    }, [dispatch, setIsLoading])

    const onSubmit = (data:FormState) => {
        setIsLoading(true)
        let temp: User = {...data, enabled: data.enabled === 'ATIVO', id: 0, roles: optionsSelected}
        dispatch(createUser(temp))
            .then(() => navigate('/painel/users'))
            .finally(() => setIsLoading(false))
    };

    const handleChange = (e: any) => {
        if (e.target.value) setOptionsSelected(e.target.value);
    };

    return (
        <CardContainer>
            <Typography variant={"h6"}>Adicionar usuario</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{mt:2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            {...register("firstName", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                            label="Nome"
                            fullWidth
                            variant="outlined"
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("lastName", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                            label="Sobrenome"
                            fullWidth
                            variant="outlined"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("email", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                            label="Email"
                            type={'email'}
                            fullWidth
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("password", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                            label="Senha"
                            type={'password'}
                            fullWidth
                            variant="outlined"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("confirmPassword", {required: {value: true, message: "Campo obrigatório!"}, validate: (value) => {
                                    const {password} = getValues();
                                    if (value.length !== 0 && value.length < 6)  return 'A senha precisa ter no minimo 6 digitos.'
                                    else if (value.length > 6) return value === password || 'As senhas não são iguais.'
                                }, maxLength: 80})}
                            label="Confirmar senha"
                            type={'password'}
                            fullWidth
                            variant="outlined"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="roles"
                            control={control}
                            render={({field}) =>
                                <FormControl fullWidth>
                                    <InputLabel>Permissões</InputLabel>
                                    <Select
                                        {...field}
                                        variant="outlined"
                                        multiple
                                        value={optionsSelected}
                                        onChange={handleChange}
                                        input={<OutlinedInput  label="Permissões" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}

                                    >
                                        {rolesItems.content.map((role) => (
                                            <MenuItem key={role.id} value={role.authority}>
                                                {role.description}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("enabled", {required: {value: true, message: "Campo obrigatório!"}})}
                            error={!!errors.enabled}
                            select
                            fullWidth
                            label="Status"
                            variant="outlined"
                            value={'ATIVO'}
                            InputLabelProps={{ shrink: true }}
                            helperText={errors.enabled?.message}
                        >
                            <MenuItem value={"ATIVO"}>Ativo</MenuItem>
                            <MenuItem value={"INATIVO"}>Desativado</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <Button variant="contained" type={'submit'} sx={{mt:2}}>Salvar</Button>
            </Box>
        </CardContainer>
    );
}

export default AddUsers;