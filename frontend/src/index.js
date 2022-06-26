import './index.css';
import axios from './api/axios';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById('root'));

function isTokenExpired() {
    console.log('start isTokenExpired');
    root.render(<App />);
    // if (!window.location.href.includes('/login')
    //     && !window.location.href.includes('/register')) {
    //     try {
    //         let token = JSON.parse(localStorage.getItem('accessToken'));
    //         axios.get("/user/me", { headers: { "Authorizations": token } })
    //             .then((res) => {
    //                 console.log('res.status: ' + res.status);
    //                 if (res.status !== 401) {
    //                     let profile = { id: res.data.id, isAdmin: res.data.isAdmin };
    //                     console.log('return checkUser profile.id: ' + profile.id);
    //                     root.render(<App />);
    //                 } else {
    //                     window.location.href = '/login';
    //                     root.render(<App />);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.log('catch1: ' + error);
    //                 window.location.href = '/login';
    //                 root.render(<App />);
    //             });
    //     } catch (error) { console.log('catch2: ' + error); }
    // }
}

isTokenExpired();