import Login from 'pages/auth/login';
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthLayout from "components/authLayout";
import Home from "pages/painel/home";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/auth/login"}/>}/>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route index element={<Navigate to={"/auth/login"}/>}/>
                <Route path="login" element={<Login/>}/>
            </Route>
            <Route path="/painel">
                <Route index element={<Navigate to={"/painel/home"}/>}/>
                <Route path="home" element={<Home/>}/>
            </Route>
        </Routes>
    );
}

export default App;
