import {SpringPage} from "types/springpage";
import {User} from "types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API} from "services/Api";
import {toast} from "react-toastify";

export const URL = "/users";

const initialState: SpringPage<User> = {
    content: [],
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 20,
    first: true,
    numberOfElements: 0,
    empty:true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAll: (state, payload:PayloadAction<SpringPage<User>>) => {
            state = payload.payload;
            return state;
        },
        getOne: (state, payload:PayloadAction<User>) => {
            state.content = [payload.payload];
            return state;
        }
    }
});

export default userSlice.reducer;

export const {getAll, getOne} = userSlice.actions;

export const useUser = (state:any) => {
    return state.user as SpringPage<User>;
}

export const getUsers = (page:number = 0, size: number = 20) => async (dispatch: any) => {
    const config = {
        params: {
            page: page,
            size: size
        }
    }
    try{
        const res = await API.get(URL, config);
        dispatch(getAll(res.data));
    }catch(e){
        toast.error("Erro ao obter usuarios")
    }
}

export const getUser = (id: number) => async (dispatch: any) => {
    try{
        const res = await API.get(`${URL}/${id}`);
        dispatch(getOne(res.data));
    } catch(e){
        toast.error("Erro ao obter usuarios")
    }
}

export const createUser = (user:User) => async (dispatch: any) => {
    try{
        await API.post(URL, user);
        toast.success("Usuario criado com sucesso");
        dispatch(getUsers());
    }
    catch(e){
        toast.error("Erro ao criar a usuario")
    }
}

export const updateUser = (id:number, user:User) => async (dispatch: any) => {
    try{
        await API.put(`${URL}/${id}`, user);
        toast.success("Usuario atualizado com sucesso");
        dispatch(getUsers());
    }
    catch(e){
        toast.error("Erro ao atualizar usuario")
    }
}

export const deleteUser = (id:number) => async (dispatch: any) => {
    try{
        await API.delete(`${URL}/${id}`);
        toast.success("Usuario deletado com sucesso");
        dispatch(getUsers());
    }
    catch(e){
        toast.error("Erro ao deletar a usuario")
    }
}