import {Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";
import {getCategories, useCategory} from "store/slices/categorySlices";
import {useEffect} from "react";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";


const Home = () => {
    const page = useSelector(useCategory)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getCategories()).finally(() => setIsLoading(false))
    }, [dispatch, setIsLoading])


    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {page.content.map(category => (
                    <div key={category.id}>
                        {category.name}
                    </div>
                ))}
            </Paper>
        </Grid>
    );
}

export default Home;