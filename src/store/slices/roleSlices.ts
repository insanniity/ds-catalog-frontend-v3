import {SpringPage} from "types/springpage";
import {Role} from "types/role";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API} from "services/Api";
import {toast} from "react-toastify";

export const URL = "/roles"

const initialState: SpringPage<Role> = {
    content: [],
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 20,
    first: true,
    numberOfElements: 0,
    empty:true,
};

export const roleSlices = createSlice({
    name: 'role',
    initialState,
    reducers: {
        getAll: (state, payload:PayloadAction<SpringPage<Role>>) => {
            state = payload.payload;
            return state;
        },
    }
});

export default roleSlices.reducer;

export const {getAll} = roleSlices.actions;

export const useRole = (state:any) => {
    return state.role as SpringPage<Role>;
}

export const getRoles = (page:number = 0, size: number = 20) => async (dispatch: any) => {
    const config = {
        params: {
            page: page,
            size: size
        }
    }
    try{
        const res = await API.get(URL, config);
        dispatch(getAll(res.data));
    }
    catch(e){
        toast.error("Erro ao obter permissões")
    }
}