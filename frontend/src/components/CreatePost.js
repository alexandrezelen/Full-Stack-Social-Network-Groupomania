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
        postImage: "",
        userId: "",
        createdAt: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Champ vide !"),
        text: Yup.string().required("Champ vide !"),
        userId: Yup.string().min(3).max(15).required(""),
        createdAt: Yup.date().default(() => new Date()),
    });

    const onSubmit = (data) => {
        axios.post("/post/", data).then((response) => {
            history("/");
        });
    };

    return (
        <div className="createPostPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
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
                        onChange={(e) =>
                            Formik.setFieldValue('postImage', e.currentTarget.files[0])
                        }
                    />

                    < label > Auteur :</label>
                    <ErrorMessage name="userId" component="span" />
                    <Field autoComplete="off" id="inputCreatePost" name="userId" placeholder="" />

                    <button type="submit">Créer un Post</button>
                </Form>
            </Formik>
        </div >
    );
}

export default CreatePost;