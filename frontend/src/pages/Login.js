import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useNavigate();

    const login = () => {
        const data = { email: email, password: password };
        axios.post("http://localhost:3001/user/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data);
                history("/");
            }
        });
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
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}>Se connecter</button>
        </div>
    );
};

export default Login;