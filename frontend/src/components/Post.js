import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    // The useNavigate hook returns a function that lets you navigate programmatically, for example after a form is submitted.
    const history = useNavigate();

    useEffect(() => {
        function getData() {
            if (load) {
                // We retrieve the posts 
                axios.get(`/post/${id}`, Headers).then((res) => { setPostObject(res.data); }).catch(error => console.log(error)); setLoader(false);
                // We retrieve comments 
                axios.get(`/comment/${postId}`, Headers).then((res) => { setComments(res.data); }).catch(error => console.log(error)); setLoader(false);
            }
        }
        getData();
        setLoader(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, postId, load]);

    // onSubmit execute a JavaScript when a form is submitted
    const onSubmit = (data) => {
        console.log(data);
        // Modification of the post
        axios.put(`/post/${postId}`,
            data,
            headerImage
        ).then(response => {
            setPostObject({ ...postObject });
            setLoader(true);
            console.log(response);
        }).catch(error => { console.log(error); });
    };

    // Modification of the title
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

    // Modification of the text
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

    // Add a comment
    const addComment = () => {
        axios.post(`/comment/${postId}`, { text: newComment, PostId: postId }, Headers)
            .then((res) => {
                let user = res.data.userData;
                // eslint-disable-next-line
                const commentToAdd = { text: newComment, User: { firstname: user.firstname, lastname: user.lastname } };
                setLoader(true);
                setNewComment("");
            })
            .catch(error => console.log(error));
    };

    // Delete the Post
    const deletePost = (id) => {
        console.log(id);
        axios.delete(`/post/${id}`, Headers)
            .then(() => {
                alert('Post supprimé !');
                history('/');
            })
            .catch(error => console.log(error));
    };

    // Delete one comment
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
                    {/* The click event is raised when the user clicks on an element.  */}
                    <h1 className="title" onClick={() => {
                        editTitle("title");
                    }}>Titre : {postObject.title}</h1>
                    {/* The click event is raised when the user clicks on an element.  */}
                    <p className="text" onClick={() => {
                        editText("text");
                    }}>Texte : {postObject.text}</p>
                    <h3 className="userId">Auteur(e) : {postObject.User.firstname} {postObject.User.lastname}</h3>
                    {/* <Formik> is a component that helps you with building forms. */}
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validator={() => ({})}>
                        {/* Just like in HTML, React uses forms to allow users to interact with the web page. */}
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
                                {/* <i className="fas fa-camera"></i> */}
                                <button type="submit">Modifier l'image</button>
                            </Form>
                        )}
                    </Formik>
                    <Formik initialValues={initialValues}>
                        <Form>
                            <div className='deleteBttn'>
                                {/* The click event is raised when the user clicks on an element.  */}
                                <FontAwesomeIcon onClick={() => deletePost(postObject.id)} icon={faTrashCan} className="trash" />
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
                            // The Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1
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