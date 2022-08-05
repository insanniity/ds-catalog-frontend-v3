import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.min.css';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "assets/theme";
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ConfigProvider from "contexts/ConfigContext";
import { Provider } from 'react-redux'
import {store} from "store/store";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
        <BrowserRouter>
            <ConfigProvider>
                    <ThemeProvider theme={theme}>
                        <Provider store={store}>
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
                        </Provider>
                    </ThemeProvider>
            </ConfigProvider>
        </BrowserRouter>
);
