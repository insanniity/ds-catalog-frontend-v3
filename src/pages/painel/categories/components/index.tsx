import {Category} from "types/category";
import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";

type Props = {
    category: Category
    handleDelete: (id: number) => void
}


const CardCategory = ({ category, handleDelete }:Props) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <Box component={Grid}
             container
             sx={{mb: 2, p: 2, backgroundColor: (theme) => theme.palette.grey[50], boxShadow: 2}}
             alignItems={'center'}
        >
            <Grid item xs={12} md={6}>
                <Typography fontWeight={600} variant={"subtitle2"}>Nome</Typography>
                {category.name}
            </Grid>
            <Grid item xs={12} md={6} sx={{textAlign: sm ? 'right' : 'center', pt:1}}>
                <Button variant="contained" color="error"
                        onClick={() => handleDelete(category.id)}> APAGAR </Button>
            </Grid>
        </Box>
    )
}

export default CardCategory;