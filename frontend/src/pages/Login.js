import React, { useState } from "react";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useNavigate();

    const login = () => {
        const data = { email: email, password: password };
        axios.post("user/login", data).then((response) => {
                console.log(response.data)
                const token = JSON.stringify(response.data);
                localStorage.setItem("accessToken", token);
                // setAuthState({
                //     email: response.data.email,
                //     id: response.data.id,
                //     status: true
                // });
                history("/");
        })
        .catch(err => alert(err))
    };
    return (
        <div className="loginContainer">
            <label>Email</label>
            <input
                type="text"
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
            />
            <label>Mot de passe</label>
            <input
                type="password"
                name="password"
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                minLength="8"
                maxLength="50"
                placeholder="Entrez votre mot de passe"
                required
            />

            <button onClick={login}>Se connecter</button>
        </div>
    );
};

export default Login;