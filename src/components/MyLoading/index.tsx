import {useConfig} from "contexts/ConfigContext";
import CircularProgress from "@mui/material/CircularProgress";
import {Box, Modal} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};

const MyLoading = () => {
    const {isLoading}  = useConfig();

    return isLoading ? (
            <Modal open={isLoading}>
                <Box sx={style} >
                    <CircularProgress size={100} sx={{color: "#10DED8"}}/>
                </Box>
            </Modal>
    ) : <></>;
}

export default MyLoading;