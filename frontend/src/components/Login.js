/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/user/login';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userForm = { email: email, password: password };
            const response = await axios.post(LOGIN_URL, { ...userForm });
            const token = JSON.stringify(response.data);
            localStorage.setItem("accessToken", token);

            setAuth({ email, password, token });
            setSuccess(true);
            return setTimeout(() =>  document.location.href="http://www.localhost:3000/", 1000);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 400) {
                setErrMsg('Mauvaise combinaison email/mot de passe');
            } else if (err.response?.status === 401) {
                setErrMsg('Non autorisé');
            } else {
                setErrMsg('La connexion au compte a échoué');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Vous êtes connecté !</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Se connecter</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email :</label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button>Se connecter</button>
                    </form>
                    <p>
                        Besoin de créer un compte ?<br />
                        <span className="line">
                        <Link to="/register">S'enregistrer</Link>                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;;