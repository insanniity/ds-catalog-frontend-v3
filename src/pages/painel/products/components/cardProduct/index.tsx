import {Box, Button, ButtonBase, Chip, Grid, styled, Typography} from "@mui/material";
import {Product} from "types/product";
import Formatadores from "utils/formatadores";

type Props = {
    product: Product,
    handleDelete: (id: number) => void
    handleEdit: (id: number) => void
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const CardProduct = ({ product, handleDelete, handleEdit }:Props) => {

    return(
            <Box component={Grid}
                 container
                 sx={{mb: 2, p: 2, backgroundColor: (theme) => theme.palette.grey[50], boxShadow: 2}}
            >

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt={product.name} src={product.imgUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container direction="row" justifyContent="center" alignItems="center">
                        <Grid item md={3} container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <b>Nome:</b> {product.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <b>Preço:</b> {Formatadores.moeda(product.price)}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Data:</b> {Formatadores.data(product.date)}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Categorias:</b> {product.categories.map(cat => (<Chip component={"span"} label={cat} key={cat} color="primary" variant="outlined" sx={{mr:1}} size={"small"} />))}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item md={7} padding={1}>
                            <Typography variant="subtitle1" component="div" >
                                <b>Descrição:</b> {Formatadores.trucateText(product.description) }
                            </Typography>
                        </Grid>
                        <Grid item md={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(product.id)} > EDITAR </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(product.id)} > APAGAR </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

    )
}

export default CardProduct;