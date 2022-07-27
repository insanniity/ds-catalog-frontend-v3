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
        }
    }
});

export default categorySlice.reducer;

export const {getAll} = categorySlice.actions;

export const useCategory = (state:any) => {
    return state.category as SpringPage<Category>;
}

export const getCategories = () => async (dispatch: any) => {
    try{
        const res = await API.get(URL)
        dispatch(getAll(res.data));
    }
    catch(e){
        toast.error("Error while getting categories")
    }
}
