//All different tool used.
import axios from '../api/axios';

export function redirectToHome() { return setTimeout(() => document.location.href = "http://www.localhost:3000/", 1000); }

export function checkUser() {
    let localUser = JSON.parse(localStorage.getItem('accessToken'));
    console.log(localUser);
    if (!localUser) {
        localStorage.removeItem('accessToken');
        return document.location.href = "http://www.localhost:3000/Login";
    } else {
        axios.get("/user/me", { headers: { "Authorizations": localUser.token } })
            .then((user) => {
                let profile = localStorage.setItem('accessToken', JSON.stringify({ id: user.data.id, isAdmin: user.data.isAdmin, token: localUser.token }));
                return profile;
            })
            .catch((err) => {
                alert(err);
                return document.location.href = "http://www.localhost:3000/Login";
            });   
    }
}

export const memo = {
    LOGIN_URL: "/user/login"
};