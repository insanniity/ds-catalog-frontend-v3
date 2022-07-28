import {SpeedDial, SpeedDialIcon} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type Props = {
    action: () => void;
}

const MySpeedDial = ({action}:Props) => {
    return (
        <SpeedDial
            ariaLabel="Adicionar"
            sx={{ position: 'absolute', bottom: 20, right: 20 }}
            icon={<SpeedDialIcon openIcon={<AddCircleOutlineIcon />} />}
            onClick={action}
            // open={true}
            FabProps={{
                sx: {
                    bgcolor: (theme) => theme.palette.success.main,
                    '&:hover': {
                        bgcolor: (theme) => theme.palette.success.main,
                    }
                }
            }}
        >
        </SpeedDial>
    )

}

export default MySpeedDial;