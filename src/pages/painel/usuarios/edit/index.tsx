import CardContainer from "components/cardContainer";
import {useSelector} from "react-redux";
import {getUser, updateUser, useUser} from "store/slices/userSlices";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
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
import {User} from "types/user";
import {getRoles, useRole} from "store/slices/roleSlices";

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    enabled: string;
    password: string;
    confirmPassword: string;
    roles: string[];
}

const EditUsers = () => {
    const pageItens = useSelector(useUser)
    const rolesItems = useSelector(useRole)
    const { register, handleSubmit, formState: { errors }, reset , getValues, control} = useForm<FormState>({defaultValues: {}});
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const navigate = useNavigate();
    const {id} = useParams();
    const [optionsSelected, setOptionsSelected] = useState<string[]>([]);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getRoles())
        setIsLoading(false)
    }, [dispatch, setIsLoading])


    useEffect(() => {
        if (!id) {
            navigate('/painel/users')
        }
    }, [id, navigate])

    useEffect(() => {
        if (id) {
            setIsLoading(false)
            dispatch(getUser(parseInt(id))).finally(() => setIsLoading(false))
        }
    }, [dispatch, id, setIsLoading])

    useEffect(() => {
        if(pageItens.content[0]){
            reset({...pageItens.content[0], enabled: pageItens.content[0].enabled ? 'ATIVO': 'INATIVO'})
            setOptionsSelected(pageItens.content[0].roles)
        }
    }, [reset, pageItens])

    const onSubmit = (data:FormState) => {
        if(id){
            setIsLoading(true)
            let temp: User = {...data, enabled: data.enabled === 'ATIVO', id: 0, roles: optionsSelected}
            dispatch(updateUser(parseInt(id), temp)).finally(() => {
                setIsLoading(false)
                navigate('/painel/users')
            })
        }
    };

    const handleChange = (e: any) => {
        if (e.target.value) setOptionsSelected(e.target.value);
    };


    return (
        <CardContainer>
            <Typography variant={"h6"}>Editar usuario</Typography>
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
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
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("password", { maxLength: 80})}
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
                            {...register("confirmPassword", {  validate: (value) => {
                                    const {password} = getValues();
                                    if (value && value.length !== 0 && value.length < 6) return 'A senha precisa ter no minimo 6 digitos.'
                                    else if (value && value.length > 6) return value === password || 'As senhas não são iguais.'
                                } , maxLength: 80})}
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
                            value={pageItens.content[0]?.enabled ? 'ATIVO': 'INATIVO'}
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

export default EditUsers;