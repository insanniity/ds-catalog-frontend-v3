import { Grid, TablePagination } from "@mui/material";
import CardContainer from "components/cardContainer";
import MySpeedDial from "components/speedDial";
import { useConfig } from "contexts/ConfigContext";
import CardCategory from "pages/painel/categories/components/cardCategory";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getCategories, useCategory } from "store/slices/categorySlices";
import { useAppDispatch } from "store/store";

const ListCategory = () => {
    const pageItens = useSelector(useCategory)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(25);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getCategories(page, size)).finally(() => setIsLoading(false))
    }, [dispatch, page, setIsLoading, size])

    const handleDelete = (id: number) => {
        setIsLoading(true)
        dispatch(deleteCategory(id)).finally(() => setIsLoading(false))
    }

    return (
        <CardContainer>
            {pageItens.content.map(category => (
                <CardCategory category={category} key={category.id} handleDelete={handleDelete} />
            ))}
            <Grid item xs={12}>
                <TablePagination
                    component="div"
                    count={pageItens.totalElements}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={size}
                    onRowsPerPageChange={(event: any) => setSize(event.target.value)}
                />
            </Grid>
            <MySpeedDial action={() => navigate('/painel/categories/add')}/>
        </ CardContainer>
    );
}

export default ListCategory;