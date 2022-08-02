import {useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProduct, updateProduct, useProduct} from "store/slices/productSlices";
import {getCategories, useCategory} from "store/slices/categorySlices";
import {Product} from "types/product";
import {
    Box,
    Button,
    Chip,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import CardContainer from "components/cardContainer";
import Formatadores from "utils/formatadores";

type FormState = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    categories: string[];
    date: string;
}


const EditProduct = () => {
    const pageItens = useSelector(useProduct)
    const categoriesItems = useSelector(useCategory)
    const { register, handleSubmit, formState: { errors }, reset , control} = useForm<FormState>({defaultValues: {}});
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const navigate = useNavigate();
    const {id} = useParams();
    const [optionsSelected, setOptionsSelected] = useState<string[]>([]);

    useEffect(() => {
        setIsLoading(true)
        dispatch(getCategories(0, 1000))
        setIsLoading(false)
    }, [dispatch, setIsLoading])


    useEffect(() => {
        if (!id) {
            navigate('/painel/products')
        }
    }, [id, navigate])

    useEffect(() => {
        if (id) {
            setIsLoading(false)
            dispatch(getProduct(parseInt(id))).finally(() => setIsLoading(false))
        }
    }, [dispatch, id, setIsLoading])

    useEffect(() => {
        if(pageItens.content[0]){
            reset({...pageItens.content[0], date: Formatadores.utcToDate(pageItens.content[0].date)})
            setOptionsSelected(pageItens.content[0].categories)
        }
    }, [reset, pageItens])

    const onSubmit = (data:FormState) => {
        console.log(data)
        if(id){
            setIsLoading(true)
            let temp: Product = {...data, categories: optionsSelected, date: Formatadores.dateToUTC(data.date)}
            dispatch(updateProduct(parseInt(id), temp)).finally(() => {
                setIsLoading(false)
                navigate('/painel/products')
            })
        }
    };

    const handleChange = (e: any) => {
        if (e.target.value) setOptionsSelected(e.target.value);
    };


  return (
      <CardContainer>
          <Typography variant={"h6"}>Editar produto</Typography>
          <Box component={'form'} onSubmit={handleSubmit(onSubmit)} sx={{mt:2}}>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                          {...register("name", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                          label="Nome"
                          fullWidth
                          variant="outlined"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          InputLabelProps={{ shrink: true }}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          {...register("date", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                          label="Data"
                          fullWidth
                          type={'date'}
                          variant="outlined"
                          error={!!errors.date}
                          helperText={errors.date?.message}
                          InputLabelProps={{ shrink: true }}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          {...register("imgUrl", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 200})}
                          label="Url da imagem"
                          type={'url'}
                          fullWidth
                          variant="outlined"
                          error={!!errors.imgUrl}
                          helperText={errors.imgUrl?.message}
                          InputLabelProps={{ shrink: true }}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <FormControl fullWidth>
                          <InputLabel>Preço</InputLabel>
                          <OutlinedInput
                              {...register("price", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 80})}
                              type={'number'}
                              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                              error={!!errors.price}
                              label="Preço"
                              inputProps={{"min": "0", "step": "0.01"}}
                          />
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <Controller
                          name="categories"
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
                                      input={<OutlinedInput  label="Categorias" />}
                                      renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                              {selected.map((value) => (
                                                  <Chip key={value} label={value} />
                                              ))}
                                          </Box>
                                      )}

                                  >
                                      {categoriesItems.content.map((category) => (
                                          <MenuItem key={category.id} value={category.name}>
                                              {category.name}
                                          </MenuItem>
                                      ))}
                                  </Select>
                              </FormControl>
                          }
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          {...register("description", {required: {value: true, message: "Campo obrigatório!"}, maxLength: 5000})}
                          label="Descrição"
                          multiline
                          minRows={4}
                          fullWidth
                          variant="outlined"
                          error={!!errors.description}
                          helperText={errors.description?.message}
                          InputLabelProps={{ shrink: true }}
                      />
                  </Grid>
              </Grid>
              <Button variant="contained" type={'submit'} sx={{mt:2}}>Salvar</Button>
          </Box>
      </CardContainer>
  );
}

export default EditProduct;