import CardContainer from "components/cardContainer";
import MySpeedDial from "components/speedDial";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {deleteUser, getUsers, useUser} from "store/slices/userSlices";
import {useAppDispatch} from "store/store";
import {useConfig} from "contexts/ConfigContext";
import {useEffect, useState} from "react";
import CardUser from "pages/painel/usuarios/components";
import {Grid, TablePagination} from "@mui/material";

const ListUsers = () => {
    const pageItens = useSelector(useUser)
    const dispatch = useAppDispatch()
    const {setIsLoading} = useConfig();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(25);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        dispatch(getUsers(page, size)).finally(() => setIsLoading(false))
    }, [dispatch, page, setIsLoading, size])

    const handleDelete = (id: number) => {
        setIsLoading(true)
        dispatch(deleteUser(id)).finally(() => setIsLoading(false))
    }

    const handleEdit = (id: number) => {
        navigate(`/painel/users/edit/${id}`)
    }

    return (
        <CardContainer>
            {pageItens.content.map(user => (
                <CardUser user={user} key={user.id} handleDelete={handleDelete}  handleEdit={handleEdit}/>
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
            <MySpeedDial action={() => navigate('/painel/users/add')}/>
        </CardContainer>
    );
}

export default ListUsers;