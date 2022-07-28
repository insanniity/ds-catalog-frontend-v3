import {Grid, Paper, Typography} from "@mui/material";


const Home = () => {



    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant={'h3'}>Categorias</Typography>
            </Paper>
        </Grid>
    );
}

export default Home;