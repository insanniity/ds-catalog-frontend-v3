import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import categoryReducer from "store/slices/categorySlices";
import userReducer from "store/slices/userSlices";
import roleReducer from "store/slices/roleSlices";
import productReducer from "store/slices/productSlices";
import authReducer from "store/slices/authSlices";

const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
    role: roleReducer,
    product: productReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
}, )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppState: () => RootState = () => store.getState()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector();