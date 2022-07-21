import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.min.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "assets/theme";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ConfigProvider from "contexts/ConfigContext";
import AuthProvider from "contexts/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ConfigProvider>
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme={'colored'}
                    />
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    </ConfigProvider>
);
