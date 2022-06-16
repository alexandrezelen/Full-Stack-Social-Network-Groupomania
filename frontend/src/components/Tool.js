//All different tool used.
import axios from '../api/axios';
// import { useState, useEffect } from 'react';

// const [authState, setAuthState] = useState({
//     firstname: "",
//     lastname: "",
//     id: 0,
//     status: false
// });

export function redirectToHome() { return setTimeout(() => document.location.href = "http://www.localhost:3000/", 1000); }

export function checkUser() {
    let token = JSON.parse(localStorage.getItem('accessToken'));
    console.log(token);
    if (!token) {
        localStorage.removeItem('accessToken');
        return document.location.href = "http://www.localhost:3000/Login";
    } else {
        axios.get("/user/me", { headers: { "Authorizations": token } })
            .then((user) => {
                let profile = user.data;
                return profile;
            })
            .catch((err) => {
                console.log(err);
                localStorage.removeItem("accessToken");
                return document.location.href = "http://www.localhost:3000/Login";
            });
    }
}

export const memo = {
    LOGIN_URL: "/user/login"
};

// useEffect(() => {
//     const token = JSON.parse(localStorage.getItem('accessToken'));
//     axios.get("/user/me", { headers: { 'Authorizations': token } })
//         .then((res) => {
//             if (res.data.error) {
//                 setAuthState({ ...authState, status: false });
//             } else {
//                 setAuthState({
//                     firstname: res.data.firstname,
//                     lastname: res.data.lastname,
//                     status: true,
//                 });
//             }
//         });
// }, [authState]);

// export function handleLogout() {
//     localStorage.removeItem("accessToken");
//     setAuthState({ firstname: "", lastname: "", id: 0, status: false });
// }