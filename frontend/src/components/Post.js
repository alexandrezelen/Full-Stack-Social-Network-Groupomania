import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import FormData from 'form-data';
import axios from '../api/axios';

function Post(post) {
    let { id } = useParams();
    const formData = new FormData();
    const postId = id;
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
    const [postObject, setPostObject] = useState({ title: "title", text: 'text', postImage: "", User: { firstname: "firstname", lastname: "lastname" } });
    const [postImage, setPostImage] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    let history = useNavigate();

    const role = authState.isAdmin === "admin";
    console.log(role);

    const initialValues = {
        title: "",
        text: "",
        postImage: {},
    };

    const onSubmit = (data) => {
        console.log(data);

        const token = JSON.parse(localStorage.getItem('accessToken'));
        axios.post("/post/", data, { headers: { 'Authorizations': token, "Content-Type": "multipart/form-data" } })
            .then((response) => { history("/"); })
            .catch(err => console.log(err));
    };

    axios
        .put(`/post/${id}`, formData, config, {
            Headers
        })
        .then((res) => {
            console.log(res);
            history.push("/");
        });

    useEffect(() => {
        function getData() {
            const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
            axios.get(`/post/${id}`, Headers).then((res) => { setPostObject(res.data); }).catch(error => console.log(error));
            axios.get(`/comment/${postId}`, Headers).then((res) => { setComments(res.data); }).catch(error => console.log(error));
        }
        getData();
    }, [id, postId]);

    const editTitle = () => {
        let newTitle = prompt("Nouveau titre : ");
        axios.put(`/post/${postId}`,
            { title: newTitle, id: postId },
            Headers
        );
        setPostObject({ ...postObject, title: newTitle });
    };

    const editText = () => {
        let newText = prompt("Nouveau texte : ");
        axios.put(`/post/${postId}`,
            { text: newText, id: postId },
            Headers
        );
        setPostObject({ ...postObject, text: newText });
    };

    const editImage = (event) => {
        formData.append('image', event.target.postObject.postImage.files[0], event.target.postObject.postImage.files[0].name);
        axios.put(`/post/${postId}`,
            formData,
            setPostObject,
            config
        );
        setPostObject({ ...postObject })
            .then(response => {
                console.log(response);
            })
            .catch(error => { console.log(error); });
    };

    const deletePost = (id) => {
        axios.delete(`/post/${id}`, Headers)
            .then(() => {
                history.push("/");
            });
    };

    const addComment = () => {
        axios.post(`/comment/${postId}`, { text: newComment, PostId: postId }, Headers)
            .then((res) => {
                let user = res.data.userData;
                const commentToAdd = { text: newComment, User: { firstname: user.firstname, lastname: user.lastname } };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            })
            .catch(error => console.log(error));
    };

    const deleteComment = (id) => {
        axios.delete(`/comment/${id}`, Headers)
            .then(() => {
                setComments(comments.filter((val) => {
                    return val.id !== id;
                }));
            });
    };

    return (

        <div key={String(post.id)} className="postPage">
            <article className="upSide">
                <div className="post" id="individual">
                    {/* <h2 className="title" onClick={() => {
                        editTitle("title");
                    }}> {postObject.title}</h2>
                    <p className="text" onClick={() => {
                        editText("text");
                    }}>{postObject.text}</p> */}

                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        // method="PUT"
                        // encType="multipart/form-data"
                    >
                        {(formProps) => (
                            <Form
                                className="formContainer"
                                // method="PUT"
                                // encType='multipart/form-data'
                            >
                                <h2 className="title" onClick={() => {
                                    editTitle("title");
                                }}> {postObject.title}</h2>
                                <p className="text" onClick={() => {
                                    editText("text");
                                }}>{postObject.text}</p>
                                <div onSubmit={(event) => editImage(event)}>
                                    {/* eslint-disable-next-line */}
                                    <img className="postImage"
                                        src={postObject.postImage}
                                        alt="a post image" />
                                    <input
                                        type='file'
                                        name='postImage'
                                        accept='image/*'
                                        id="postImage"
                                        onChange={(e) => {
                                            formProps.setFieldValue("image", e.currentTarget.files[0]);
                                        }}
                                    />
                                    <button type="submit">Modifier l'image</button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <h3 className="userId">{postObject.User.firstname} {postObject.User.lastname}</h3>
                </div>
            </article>

            <div className="downSide">
                <div className='addCommentContainer'>
                    <input type="text"
                        placeholder='Commentaire...'
                        autoComplete='off'
                        value={newComment}
                        onChange={(event) => { setNewComment(event.target.value); }}
                    />
                    <button className='commentBttn' onClick={addComment}>Ajouter</button>
                </div>

                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        let user = { ...comment.User };
                        return (
                            <div key={Math.floor(Math.random() * 1000)} className='comment__box'>
                                <div className='comment__text'>
                                    <h4 key={key}>{user.firstname} {user.lastname}</h4>
                                    <p className='comment'>{comment.text}</p>
                                    {authState.firstname === comment.firstname || role === true ? (
                                        <button className='smallBttn' onClick={() => {
                                            deleteComment(comment.id);
                                        }}
                                        >
                                            X
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Post;