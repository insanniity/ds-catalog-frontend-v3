import {Card, CardActionArea, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {Product} from "types/product";
import Formatadores from "utils/formatadores";

type Props = {
    product: Product,
    handleView: (id: number) => void
}

const CardCatalogo = ({product, handleView}: Props) => {
    return (
        <Card sx={{p:1, minHeight:300,}}>
            <CardActionArea onClick={() => handleView(product.id)}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.imgUrl}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" sx={{fontWeight: 700}} color="primary">
                        {product.name}
                    </Typography>
                    <Typography variant="body2">
                        {product.categories.map(cat => (<Chip component={"span"} label={cat} key={cat} color="primary" variant="outlined" sx={{mr:1, fontSize:12}} size={"small"} />))}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{mt:2}} fontSize={24} fontWeight={700}>
                        {Formatadores.moeda(product.price)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardCatalogo;