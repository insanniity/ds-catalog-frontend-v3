import {useConfig} from "contexts/ConfigContext";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {deleteProduct, getProducts, useProduct} from "store/slices/productSlices";
import {useAppDispatch} from "store/store";
import CardContainer from "components/cardContainer";
import {Grid, TablePagination} from "@mui/material";
import MySpeedDial from "components/speedDial";
import CardProduct from "pages/painel/products/components/cardProduct";

const ListProducts = () => {
  const pageItens = useSelector(useProduct)
  const dispatch = useAppDispatch()
  const {setIsLoading} = useConfig();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
      setIsLoading(true)
      dispatch(getProducts(page, size)).finally(() => setIsLoading(false))
  }, [dispatch, page, setIsLoading, size])

  const handleDelete = (id: number) => {
      setIsLoading(true)
      dispatch(deleteProduct(id)).finally(() => setIsLoading(false))
  }

  const handleEdit = (id: number) => {
      navigate(`/painel/products/edit/${id}`)
  }


  return (
      <CardContainer>
          {pageItens.content.map(product => (
              <CardProduct product={product} key={product.id} handleDelete={handleDelete}  handleEdit={handleEdit}/>
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
          <MySpeedDial action={() => navigate('/painel/products/add')}/>
      </CardContainer>
  );
}

export default ListProducts;