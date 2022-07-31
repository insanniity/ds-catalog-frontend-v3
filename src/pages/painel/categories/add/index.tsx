import CardContainer from "components/cardContainer";
import {useForm} from "react-hook-form";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "store/store";
import {createCategory} from "store/slices/categorySlices";
import {useNavigate} from "react-router-dom";
import {useConfig} from "contexts/ConfigContext";

type FormState = {
    name: string;
}


const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormState>();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {setIsLoading} = useConfig();

    const onSubmit = (data:FormState) => {
        setIsLoading(true)
        dispatch(createCategory(data.name))
            .then(() => navigate('/painel/categories'))
            .finally(() => setIsLoading(false))
    };

    return (
        <CardContainer>
            <Typography variant={"h6"}>Adicionar Categoria</Typography>
            <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{mt:2}}>
                <TextField
                    {...register("name", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                    id="outlined-basic"
                    label="Nome"
                    fullWidth
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <Button variant="contained" type={'submit'} sx={{mt:2}}>Salvar</Button>
            </Box>
        </CardContainer>
    );
}

export default AddCategory;