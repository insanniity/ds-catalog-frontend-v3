import Login from 'pages/auth/login';
import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthLayout from "components/authLayout";
import Home from "pages/painel/home";
import PainelLayout from "components/painelLayout";
import ListCategory from "pages/painel/categories/list";
import AddCategory from "pages/painel/categories/add";
import ListUsers from "pages/painel/usuarios/list";
import AddUsers from "pages/painel/usuarios/add";
import EditUsers from "pages/painel/usuarios/edit";
import HasPermissao from "pages/painel";
import ListProducts from './pages/painel/products/list/index';
import AddProduct from 'pages/painel/products/add';
import EditProduct from 'pages/painel/products/edit';
import SiteLayout from "components/siteLayout";
import HomeSite from "pages/site/home";
import Catalogo from "pages/site/catalogo";
import {useAppDispatch} from "store/store";
import {AUTH_KEY} from "constants/auth";
import {ls} from "hooks/useLocalStorage";
import {setCredentials} from "store/slices/authSlices";
import Produto from "pages/site/produto";


function App() {
    const dispatch = useAppDispatch();
    const auth = ls.get(AUTH_KEY);

    useEffect(() => {
        if (auth) {
            dispatch(setCredentials(auth));
        }
    } , [auth, dispatch]);


    return (
        <Routes>
            <Route path="/" element={<SiteLayout/>}>
                <Route index element={<HomeSite />}/>
                <Route path="catalogo" element={<Catalogo />}/>
                <Route path="produto" element={<Navigate to={"/catalogo"}/>}/>
                <Route path="produto/:id" element={<Produto />}/>
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route index element={<Navigate to={"/auth/login"}/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
            <Route path="/painel" element={<PainelLayout />}>
                <Route index element={<Navigate to={"/painel/home"}/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="users" element={<HasPermissao role={["ROLE_ADMIN"]} />}>
                    <Route index element={<ListUsers/>}/>
                    <Route path="add" element={<AddUsers/>}/>
                    <Route path="edit/:id" element={<EditUsers/>}/>
                </Route>
                <Route path="categories" element={<HasPermissao/>}>
                    <Route index element={<ListCategory />}/>
                    <Route path="add" element={<AddCategory/>}/>
                </Route>
                <Route path="products" element={<HasPermissao/>}>
                    <Route index element={<ListProducts/>}/>
                    <Route path="add" element={<AddProduct />}/>
                    <Route path="edit/:id" element={<EditProduct />}/>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
