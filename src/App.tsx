import Login from 'pages/auth/login';
import React from 'react';
import {Navigate, useRoutes} from "react-router-dom";
import AuthLayout from "components/authLayout";
import Home from "pages/painel/home";
import PainelLayout from "components/painelLayout";
import ListCategory from "pages/painel/categories/list";
import AddCategory from "pages/painel/categories/add";


function App() {
    let element = useRoutes([
        { path: "/", element: <Navigate to={"/auth/login"}/>  },
        { path: "auth", element: <AuthLayout/>,
            children: [
                { path: "auth", element: <Navigate to={"/auth/login"}/>, index: true },
                { path: "login", element: <Login/> },
            ]
        },
        { path: "painel", element: <PainelLayout/>,
            children: [
                { path: "painel", element: <Navigate to={"/painel/home"}/>, index: true },
                { path: "home", element: <Home/> },
                { path: "categories", element: <ListCategory/> },
                { path: "categories/add", element: <AddCategory/> },
            ]
        },
    ]);

    return element;
    // (
    //     <Routes>
    //         <Route path="/" element={<Navigate to={"/auth/login"}/>}/>
    //         <Route path="/auth" element={<AuthLayout/>}>
    //             <Route index element={<Navigate to={"/auth/login"}/>}/>
    //             <Route path="login" element={<Login/>}/>
    //         </Route>
    //         <Route path="/painel" element={<PainelLayout />}>
    //             <Route index element={<Navigate to={"/painel/home"}/>}/>
    //             <Route path="home" element={<Home/>}/>
    //             <Route path="categories">
    //                 <Route index element={<ListCategory />}/>
    //                 <Route path="add" element={<AddCategory/>}/>
    //             </Route>
    //         </Route>
    //     </Routes>
    // );
}

export default App;
