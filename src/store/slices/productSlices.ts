import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API } from "services/Api";
import { Product } from "types/product";
import { SpringPage } from "types/springpage";

export const URL = "/products";


const initialState: SpringPage<Product> = {
    content: [],
    last: true,
    totalElements: 0,
    totalPages: 0,
    size: 20,
    first: true,
    numberOfElements: 0,
    empty:true,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getAll: (state, payload:PayloadAction<SpringPage<Product>>) => {
            state = payload.payload;
            return state;
        },
        getOne: (state, payload:PayloadAction<Product>) => {
            state.content = [payload.payload];
            return state;
        }
    }
});

export default productSlice.reducer;

export const {getAll, getOne} = productSlice.actions;

export const useProduct = (state:any) => {
    return state.product as SpringPage<Product>;
}



export const getProducts = (page:number = 0, size: number = 20) => async (dispatch: any) => {
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
        toast.error("Erro ao obter produtos")
    }
}

export const getProduct = (id: number) => async (dispatch: any) => {
    try{
        const res = await API.get(`${URL}/${id}`);
        dispatch(getOne(res.data));
    } catch(e){
        toast.error("Erro ao obter produtos")
    }
}

export const createProduct = (product:Product) => async (dispatch: any) => {
    try{
        await API.post(URL,product);
        toast.success("Produto criado com sucesso");
        dispatch(getProducts());
    }
    catch(e){
        toast.error("Erro ao criar a produto")
    }
}

export const updateProduct = (id:number, user:Product) => async (dispatch: any) => {
    try{
        await API.put(`${URL}/${id}`, user);
        toast.success("Produto atualizado com sucesso");
        dispatch(getProducts());
    }
    catch(e){
        toast.error("Erro ao atualizar produto")
    }
}

export const deleteProduct = (id:number) => async (dispatch: any) => {
    try{
        await API.delete(`${URL}/${id}`);
        toast.success("Produto deletado com sucesso");
        dispatch(getProducts());
    }
    catch(e){
        toast.error("Erro ao deletar a produto")
    }
}