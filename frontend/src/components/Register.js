import axios from '../api/axios';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import '../navigation.css';


const FIRSTNAME_REGEX = /^(?=.*[a-z])/;
const LASTNAME_REGEX = /^(?=.*[a-z])/;
const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[!@#$%]).{8,50}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,150}$/;
const REGISTER_URL = 'user/signup';

const Register = () => {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();

    const [firstname, setFirstname] = useState('');
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [lastname, setLastname] = useState('');
    const [validLastname, setValidLastname] = useState(false);
    const [lastnameFocus, setLastnameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        firstnameRef.current.focus();
    }, []);

    useEffect(() => {
        lastnameRef.current.focus();
    }, []);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidFirstname(FIRSTNAME_REGEX.test(firstname));
    }, [firstname]);

    useEffect(() => {
        setValidLastname(LASTNAME_REGEX.test(lastname));
    }, [lastname]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPassword]);

    // This function will receive the form data if form validation is successful.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = FIRSTNAME_REGEX.test(firstname);
        const v2 = LASTNAME_REGEX.test(lastname);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const userForm = { email: email, password: password, firstname: firstname, lastname: lastname };
            const response = await axios.post(REGISTER_URL, { ...userForm });
            console.log(await JSON.stringify(response));
            setSuccess(true);
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setMatchPassword('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 409) {
                setErrMsg('Mail déjà pris');
            } else {
                setErrMsg('Non enregistré');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Ça a fonctionné !</h1>
                    <p>
                        <Link to="/login">Se connecter</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>S'enregister</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstname">
                            Prénom :
                            <FontAwesomeIcon icon={faCheck} className={validFirstname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstname || !firstname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            ref={firstnameRef}
                            autoComplete="off"
                            placeholder="..."
                            onChange={(e) => setFirstname(e.target.value)}
                            value={firstname}
                            required
                            aria-invalid={validFirstname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setFirstnameFocus(true)}
                            onBlur={() => setFirstnameFocus(false)}
                        />
                        <p id="uidnote" className={firstnameFocus && firstname && !validFirstname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Seules les lettres en minuscule sont acceptées<br />
                        </p>

                        <label htmlFor="lastname">
                            Nom :
                            <FontAwesomeIcon icon={faCheck} className={validLastname ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastname || !lastname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            ref={lastnameRef}
                            autoComplete="off"
                            placeholder="..."
                            onChange={(e) => setLastname(e.target.value)}
                            value={lastname}
                            required
                            aria-invalid={validLastname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setLastnameFocus(true)}
                            onBlur={() => setLastnameFocus(false)}
                        />
                        <p id="uidnote" className={lastnameFocus && lastname && !validLastname ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Seules les lettres en minuscule sont acceptées<br />
                        </p>

                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            placeholder="..."
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Le mail doit contenir 8 caractères minimum<br />
                        </p>


                        <label htmlFor="password">
                            Mot de passe :
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="..."
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                        />
                        <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Le mot de passe doit contenir 8 caractères minimum<br />
                            Il doit contenir au moins une majuscule, une minuscule et un chiffre<br />
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirmez le mot de passe :
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            placeholder="..."
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Les mots de passe doivent correspondre
                        </p>

                        <button disabled={!firstname || !lastname || !validEmail || !validPassword || !validMatch ? true : false}>S'enregistrer</button>
                    </form>
                    <p>
                        Déjà enregistré ?<br />
                        <span className="line">
                            <Link to="/login">Se connecter</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Register;