import {Category} from "types/category";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API} from "services/Api";
import {toast} from "react-toastify";
import {SpringPage} from "types/springpage";

export const URL = "/categories"

const initialState: SpringPage<Category> = {
    content: [],
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 20,
    first: true,
    numberOfElements: 0,
    empty:true,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getAll: (state, payload:PayloadAction<SpringPage<Category>>) => {
            state = payload.payload;
            return state;
        },
    }
});

export default categorySlice.reducer;

export const {getAll} = categorySlice.actions;

export const useCategory = (state:any) => {
    return state.category as SpringPage<Category>;
}

export const getCategories = (page:number = 0, size: number = 20) => async (dispatch: any) => {
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
        toast.error("Erro ao obter categorias")
    }
}

export const deleteCategory = (id:number) => async (dispatch: any) => {
    try{
        await API.delete(`${URL}/${id}`);
        toast.success("Categoria excluída com sucesso");
        dispatch(getCategories());
    }
    catch(e){
        toast.error("Erro ao excluir a categoria")
    }
}
