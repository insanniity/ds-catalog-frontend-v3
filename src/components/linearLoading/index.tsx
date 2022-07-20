import LinearProgress from "@mui/material/LinearProgress";
import {useConfig} from "contexts/ConfigContext";

const LinearLoading = () => {
    const {isLoading}  = useConfig();

    return isLoading ? (
            <LinearProgress sx={{ width: '100%'}}/>
    ) : <></>;
}

export default LinearLoading;