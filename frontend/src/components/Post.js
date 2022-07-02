import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Formik, Form } from "formik";

function Post(post) {
    const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
    const headerImage = { headers: { 'Content-Type': 'multipart/form-data', 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
    const { id } = useParams();
    const postId = id;
    const [load, setLoader] = useState(true);
    const [postObject, setPostObject] = useState({ title: "title", text: 'text', postImage: "", User: { firstname: "firstname", lastname: "lastname" } });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const initialValues = { postImage: {} };
    const history = useNavigate();

    useEffect(() => {
        function getData() {
            if (load) {
                axios.get(`/post/${id}`, Headers).then((res) => { setPostObject(res.data); }).catch(error => console.log(error)); setLoader(false);
                axios.get(`/comment/${postId}`, Headers).then((res) => { setComments(res.data); }).catch(error => console.log(error)); setLoader(false);
            }
        }
        getData();
        setLoader(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, postId, load]);

    const onSubmit = (data) => {
        axios.put(`/post/${postId}`,
            data,
            headerImage
        ).then(response => {
            setPostObject({ ...postObject });
            setLoader(true);
            console.log(response);
        }).catch(error => { console.log(error); });
    };

    const editTitle = () => {
        let newTitle = prompt("Nouveau titre : ");
        axios.put(`/post/${postId}`,
            { title: newTitle, id: postId },
            Headers
        ).then(response => {
            setPostObject({ ...postObject, title: newTitle });
            setLoader(true);
        }).catch(error => { console.log(error); });
    };

    const editText = () => {
        let newText = prompt("Nouveau texte : ");
        axios.put(`/post/${postId}`,
            { text: newText, id: postId },
            Headers
        ).then(response => {
            setPostObject({ ...postObject, text: newText });
            setLoader(true);
        }).catch(error => { console.log(error); });
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

    const deletePost = (id) => {
        axios.delete(`/post/${id}`, Headers)
            .then(() => {
                alert('Post supprimé !');
                history('/');
            })
            .catch(error => console.log(error));
    };

    const deleteComment = (id) => {
        axios.delete(`/comment/${id}`, Headers)
            .then(() => {
                alert('Commentaire supprimé !');
                history('/');
            })
            .catch(error => console.log(error));
    };

    return (
        <div key={String(post.id)} className="postPage">
            <article className="upSide">
                <div className="post" id="individual">
                    <h1 className="title" onClick={() => {
                        editTitle("title");
                    }}> {postObject.title}</h1>
                    <p className="text" onClick={() => {
                        editText("text");
                    }}>{postObject.text}</p>
                    <h3 className="userId">{postObject.User.firstname} {postObject.User.lastname}</h3>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {(formProps) => (
                            <Form>
                                {/* eslint-disable-next-line */}
                                <img className="postImage"
                                    src={postObject.postImage}
                                    alt="a post image" />
                                <label htmlFor='postImage'>Choisir une image :</label>
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
                            </Form>
                        )}
                    </Formik>
                    <Formik initialValues={initialValues}>
                        <Form>
                            <div className='deleteBttn'>
                                <button type="submit" onClick={() => deletePost(postObject.id)}>Supprimer le Post</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </article >
            <article className="downSide">
                <div className='addCommentContainer'>
                    <label htmlFor='commentInput'>Laisser un commentaire :</label>
                    <input type="text"
                        name='commentInput'
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
                                    <button className='smallBttn' onClick={() => {
                                        deleteComment(comment.id);
                                    }}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </article>
        </div >
    );
};

export default Post;