import {Button, Chip, Container, Grid, Typography, useTheme} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useSelector} from "react-redux";
import {getProduct, useProduct} from "store/slices/productSlices";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useEffect} from "react";
import Formatadores from "utils/formatadores";

const Produto = () => {
    const theme = useTheme();
    const pageItens = useSelector(useProduct)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            setIsLoading(false)
            dispatch(getProduct(parseInt(id))).finally(() => setIsLoading(false))
        }
    }, [dispatch, id, setIsLoading])

    return (
        <Container maxWidth={"xl"} sx={{backgroundColor: theme.palette.background.paper, p:1, mt:3, borderRadius:2}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant={"text"} sx={{fontWeight: 700}} startIcon={<ArrowBackIosIcon />} onClick={() => navigate("/catalogo")}>Voltar</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={pageItens.content[0].imgUrl} alt={pageItens.content[0].name} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant={"h4"} color={"primary"} fontWeight={700}>
                        {pageItens.content[0].name}
                    </Typography>
                    <Typography variant="body2" sx={{mt:2}} >
                        {pageItens.content[0].categories.map(cat => (<Chip component={"span"} label={cat} key={cat} color="primary" variant="outlined" sx={{mr:1, fontSize:12}} size={"small"} />))}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{mt:2}} fontSize={24} fontWeight={700}>
                        {Formatadores.moeda(pageItens.content[0].price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt:2}} textAlign={'justify'}>
                        {pageItens.content[0].description}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Produto;