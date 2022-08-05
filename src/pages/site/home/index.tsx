import {Button, Card, CardMedia, Container, Grid, Paper, Typography, useTheme} from "@mui/material";
import desenho from "assets/imagens/desenho.svg"
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from "react-router-dom";

const HomeSite = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="xl" >
            <Grid container component={Paper} alignItems={"center"} justifyContent={"center"} maxWidth={"xl"} sx={{my:4, p:{xs:1, md: 5}}} height={"calc(100vh - 200px)"} elevation={6}>
                <Grid item xs={12} md={6} sx={{p:5,textAlign: "center"}}>
                    <Typography
                        variant="h3"
                        align="center"
                        color="text.primary"
                        fontWeight={700}
                        gutterBottom
                    >
                        Conheça o melhor catálogo de produtos
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        fontWeight={500}
                        gutterBottom
                    >
                        Ajudaremos você a encontrar os melhores produtos disponíveis no mercado.
                    </Typography>
                    <Button variant="contained" endIcon={<SendIcon />} sx={{mt: {xs:0, md: 20} , py: 1.5, px:10, fontWeight:700}} size="large" onClick={() =>  navigate("/catalogo")}>
                        INICIE AGORA A SUA BUSCA
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} sx={{textAlign: "center"}}>
                    <Card sx={{ maxWidth: "75%" }} elevation={0}>
                        <CardMedia
                            component="img"
                            image={desenho}
                            alt="Paella dish"
                        />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomeSite;