import {useConfig} from "contexts/ConfigContext";
import CircularProgress from "@mui/material/CircularProgress";
import {Backdrop} from "@mui/material";

const MyLoading = () => {
    const {isLoading}  = useConfig();

    return isLoading ? (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
    ) : <></>;
}

export default MyLoading;