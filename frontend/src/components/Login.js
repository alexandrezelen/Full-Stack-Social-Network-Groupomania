import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import * as tools from './Tool';

const Login = () => {
    // The useRef Hook allows you to persist values between renders.
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Accepts a function that contains imperative, possibly effectful code.
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    // This function will receive the form data if form validation is successful.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userForm = { email: email, password: password };
            const response = await axios.post(tools.memo.LOGIN_URL, { ...userForm });
            localStorage.setItem("accessToken", JSON.stringify(response.data));
            return tools.redirectToHome();
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
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Connexion</h1>
            {/* onSubmit execute a JavaScript when a form is submitted */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    placeholder='...'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="password">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    placeholder='...'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Se connecter</button>
            </form>
            <p>
                Besoin de créer un compte ?<br />
                <span className="line">
                    <Link to="/register">S'enregistrer</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;