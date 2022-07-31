import {ReactNode} from "react";
import {Grid, Paper} from "@mui/material";

type Props = {
    children: ReactNode
}


const CardContainer = ({children}: Props) => {
    return (
        <Grid item xs={12}>
            <Paper component={Grid} sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                {children}
            </Paper>
        </Grid>
    )
}

export default CardContainer;