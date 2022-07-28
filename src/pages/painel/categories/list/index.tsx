import {Box, Button, Card, Grid, Paper, TablePagination, useMediaQuery, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {deleteCategory, getCategories, useCategory} from "store/slices/categorySlices";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import MySpeedDial from "components/speedDial";

const ListCategory = () => {
    const pageItens = useSelector(useCategory)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(25);
    const navigate = useNavigate();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    useEffect(() => {
        setIsLoading(true)
        dispatch(getCategories(page, size)).finally(() => setIsLoading(false))
    }, [dispatch, page, setIsLoading, size])

    const handleDelete = (id: number) => {
        dispatch(deleteCategory(id))
    }

    return (
        <Grid item xs={12}>
            <Paper component={Grid} sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
                    {pageItens.content.map(category => (
                        <Box component={Grid} container sx={{mb: 2, p:2, backgroundColor: (theme) => theme.palette.grey[50], boxShadow: 2}} key={category.id} alignItems={'center'}>
                            <Grid item xs={12} md={6}>
                                    {category.name}
                            </Grid>
                            <Grid item xs={12} md={6} sx={{textAlign: sm ? 'right' : 'center'}}>
                                <Button variant="contained" color="error" onClick={() => handleDelete(category.id)} > APAGAR </Button>
                            </Grid>
                        </Box>
                    ))}
                    <Grid item xs={12}>
                        <TablePagination
                            component="div"
                            count={pageItens.totalElements}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            rowsPerPage={size}
                            onRowsPerPageChange={(event:any) => setSize(event.target.value)}
                        />
                    </Grid>
                    <MySpeedDial action={() => navigate('add')} />
            </Paper>
        </Grid>
    );
}

export default ListCategory;