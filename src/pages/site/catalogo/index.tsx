import {useSelector} from "react-redux";
import {getProducts, useProduct} from "store/slices/productSlices";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, Grid, TablePagination} from "@mui/material";
import CardCatalogo from "pages/site/catalogo/components/card";

const Catalogo = () => {
    const pageItens = useSelector(useProduct)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(12);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getProducts(page, size)).finally(() => setIsLoading(false))
    }, [dispatch, page, setIsLoading, size])

    const handleView = (id: number) => {
        navigate(`/produto/${id}`)
    }

    return (
        <Container sx={{ mt: 3, p:3, borderRadius: 2}} maxWidth={"xl"}>
            <Grid container spacing={2}>
                {pageItens.content.map(product => (
                    <Grid item xs={12} sm={6} md={2} key={product.id}>
                        <CardCatalogo product={product} key={product.id} handleView={() => handleView(product.id)}/>
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12}>
                <TablePagination
                    component="div"
                    count={pageItens.totalElements}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={size}
                    rowsPerPageOptions={[12, 24, 36, 48]}
                    onRowsPerPageChange={(event: any) => setSize(event.target.value)}
                />
            </Grid>
        </Container>
    );
}

export default Catalogo;