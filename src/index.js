import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import reportWebVitals from "./reportWebVitals";
import SimpleReactLightbox from "simple-react-lightbox";
import  ThemeContext  from "./context/ThemeContext"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
    <React.StrictMode>
        <Provider store = {store}>
            <SimpleReactLightbox>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <BrowserRouter basename='/'>
                    <ThemeContext>
                        <App />
                    </ThemeContext>  
                 { /*   <App /> */  }
                </BrowserRouter>    
            </SimpleReactLightbox>
        </Provider>	
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
