import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import Login from './app/user-pages/Login'
import * as serviceWorker from './serviceWorker';

let loginStatus = localStorage.getItem('loginStatus');

let logged = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        , document.getElementById('root'));
}

let notLogged = () => {
    ReactDOM.render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        , document.getElementById('root'));
}

if (loginStatus) {
    logged()
} else {
    notLogged()
}

serviceWorker.unregister();