import Login from 'pages/auth/login';
import React from 'react';
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


function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/auth/login"}/>}/>
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
