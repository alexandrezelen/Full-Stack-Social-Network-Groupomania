import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {

    let history = useNavigate();

    const initialValues = {
        title: "",
        text: "",
        postImage: {},
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Champ vide !"),
        text: Yup.string().required("Champ vide !"),
    });

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
                {(formProps) => (
                    <Form className="formContainer">
                        <h1>Créer un Post</h1>
                        <label>Titre :</label>
                        <ErrorMessage name="title" component="span" />
                        <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="..." />

                        <label>Texte :</label>
                        <ErrorMessage name="text" component="span" />
                        <Field autoComplete="off" id="inputCreatePost" name="text" placeholder="..." />

                        <label>Image :</label>
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