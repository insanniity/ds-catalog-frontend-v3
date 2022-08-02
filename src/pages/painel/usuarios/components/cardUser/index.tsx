import {Box, Button, Chip, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import {User} from "types/user";

type Props = {
    user: User,
    handleDelete: (id: number) => void
    handleEdit: (id: number) => void
}


const CardUser = ({ user, handleDelete, handleEdit }:Props) => {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <Box component={Grid}
             container
             sx={{mb: 2, p: 2, backgroundColor: (theme) => theme.palette.grey[50], boxShadow: 2}}
             alignItems={'center'}
        >
            <Grid item xs={12} md={3}>
                <Typography fontWeight={600} variant={"subtitle2"}>Nome</Typography>
                {`${user.firstName} ${user.lastName}`}
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography fontWeight={600} variant={"subtitle2"}>E-mail</Typography>
                {`${user.email}`}
            </Grid>
            <Grid item xs={12} md={3}>
                <Typography fontWeight={600} variant={"subtitle2"}>Permissões</Typography>
                {user.roles.map(role => <Chip label={role.substring(5)} key={role} color="primary" variant="outlined" sx={{mr:1}} size={"small"}/>)}
            </Grid>
            <Grid item xs={12} md={1}>
                <Typography fontWeight={600} variant={"subtitle2"}>Status</Typography>
                {user.enabled ?  <Chip label="Ativo" color="success" size={"small"}/> : <Chip label="Desativado" color="error" size={"small"} />}
            </Grid>
            <Grid item xs={12} md={2} sx={{textAlign: sm ? 'right' : 'center', pt:1}} flexDirection={'row'}>
                <Button variant="contained" color="primary" onClick={() => handleEdit(user.id)} sx={{mr: 1}}> EDITAR </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} sx={{mr: 1}}> APAGAR </Button>
            </Grid>
        </Box>
    )
}

export default CardUser;