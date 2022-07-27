import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import categoryReducer from "store/slices/categorySlices";

const rootReducer = combineReducers({
    category: categoryReducer
})


export const store = configureStore({
    reducer: rootReducer,
}, )

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch