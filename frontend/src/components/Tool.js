import axios from "../api/axios";
export function redirectToHome() { return setTimeout(() => document.location.href = "http://www.localhost:3000/", 500); }

export const memo = {
    LOGIN_URL: "/user/login"
};

export async function checkUser() {
    try {
        let token = JSON.parse(localStorage.getItem('accessToken'));
        let user = await axios.get("/user/me", { headers: { "Authorizations": token } });
        let profile = { id: user.data.id, isAdmin: user.data.isAdmin };
        return profile;
    } catch (error) { console.log(error); }
}