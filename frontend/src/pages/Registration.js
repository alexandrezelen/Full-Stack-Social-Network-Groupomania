import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const initialValues = {
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Champ vide!"),
        password: Yup.string().min(4).max(20).required("Champ vide!")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/user/signup", data).then(() => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.response);
        })
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Email: </label>
                    <ErrorMessage name="email" component="span" />
                    <Field autoComplete="off" name="email" placeholder="ex: alexandre@yahoo.fr" />
                    <label>Mot de passe: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field autoComplete="off" type="password" name="password" placeholder="Votre mot de passe..." />
                    <label>Prénom: </label>
                    <ErrorMessage name="firstname" component="span" />
                    <Field autoComplete="off" name="firstname" placeholder="Votre prénom..." />
                    <label>Nom: </label>
                    <ErrorMessage name="lastname" component="span" />
                    <Field autoComplete="off" name="lastname" placeholder="Votre nom..." />

                    <button type="submit" value="Submit"> S'enregistrer</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
