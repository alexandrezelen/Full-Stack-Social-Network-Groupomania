import axios from '../api/axios';
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    // The useNavigate hook returns a function that lets you navigate programmatically, for example after a form is submitted.
    let history = useNavigate();
    // An object that describes initial values of the fields.
    const initialValues = {
        title: "",
        text: "",
        postImage: {},
    };

    // Formik is designed to manage forms with complex validation with ease.
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Champ vide !"),
        text: Yup.string().required("Champ vide !"),
    });
    // onSubmit execute a JavaScript when a form is submitted
    const onSubmit = (data) => {
        console.log(data);
        const token = JSON.parse(localStorage.getItem('accessToken'));
        axios.post("/post/", data, { headers: { 'Authorizations': token, "Content-Type": "multipart/form-data" } })
            .then((response) => { history("/"); })
            .catch(err => console.log(err));
    };

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {/* Just like in HTML, React uses forms to allow users to interact with the web page. */}
                {(formProps) => (
                    <Form className="formContainer">
                        <h1>Post</h1>
                        <label htmlFor='title'>Titre :</label>
                        <ErrorMessage name="title" component="span" />
                        <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="..." />

                        <label htmlFor='text'>Texte :</label>
                        <ErrorMessage name="text" component="span" />
                        <Field autoComplete="off" id="inputCreatePost" name="text" placeholder="..." />

                        <label htmlFor='postImage'>Image :</label>
                        <input
                            type='file'
                            name='postImage'
                            accept='image/*'
                            id="postImage"
                            onChange={(event) => {
                                formProps.setFieldValue("image", event.currentTarget.files[0]);
                            }}
                        />
                        <button type="submit">Créer un Post</button>
                    </Form>
                )}
            </Formik>
        </div >
    );
}

export default CreatePost;