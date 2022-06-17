// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';

// function Post() {
//     let { id } = useParams();
//     const [postObject, setPostObject] = useState({});
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState("");

//     let history = useNavigate();

//     useEffect(() => {
//         axios.get(`/post/${id}`).then((response) => {
//             setPostObject(response.data);
//         });

//         axios.get(`/comment/${id}`).then((response) => {
//             setComments(response.data);
//         });
//     }, [id]);

//     const addComment = () => {
//         axios
//             .post("/comment/", {
//                 text: newComment,
//                 PostId: id,
//             },
//                 {
//                     headers: {
//                         'Authorizations': localStorage.getItem('accessToken')
//                     }
//                 }
//             )
//             .then((response) => {
//                 if (response.data.error) {
//                     console.log(response.data.error);
//                 } else {
//                     const commentToAdd = { text: newComment };
//                     setComments([...comments, commentToAdd]);
//                     setNewComment("");
//                 }
//             });
//     };
//     const deletePost = (id) => {
//         axios.delete(`/post/${id}`, {
//             headers: {
//                 'Authorizations': localStorage.getItem('accessToken')
//             }
//         }).then(() => {
//             history('/');
//         });
//     };

//     const editPost = (option) => {
//         if (option === "title") {
//             let newTitle = prompt('Nouveau titre :');
//             axios.put('/post/', { newTitle: newTitle, id: id }, {
//                 headers: {
//                     'Authorizations': localStorage.getItem('accessToken')
//                 }
//             });
//             setPostObject({ ...postObject, title: newTitle });
//         } else {
//             let newText = prompt('Nouveau texte :');
//             axios.put('/post/', { newText: newText, id: id }, {
//                 headers: {
//                     'Authorizations': localStorage.getItem('accessToken')
//                 }
//             });
//             setPostObject({ ...postObject, text: newText });
//         }
//     };

//     return (
//         <div className="postPage">
//             <div className="leftSide">
//                 <div className="post" id="individual">
//                     <div className="title" onClick={() => { editPost('title'); }}> {postObject.title} </div>
//                     <div className="text" onClick={() => { editPost('text'); }}>{postObject.text}</div>
//                     <div className="postImage">{postObject.postImage}</div>
//                     <div className="userId">{postObject.userId}</div>
//                 </div>
//                 {authState.id === postObject.id && (
//                     <button onClick={deletePost(postObject)}>Supprimer ce Post</button>
//                 )}
//             </div>
//             <div className="rightSide">
//                 <div className='addCommentContainer'>
//                     <input type="text"
//                         placeholder='Commentaire...'
//                         autoComplete='off'
//                         value={newComment}
//                         onChange={(event) => {
//                             setNewComment(event.target.value);
//                         }}
//                     />
//                     <button onClick={addComment}>Ajouter un Commentaire</button>
//                 </div>
//                 <div className='listOfComments'>
//                     {comments.map((comment, key) => {
//                         return (
//                             <div key={key} className='comment'>
//                                 {comment.text}
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Post;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function Post() {
    // retrouve l'id du Post
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`/post/${id}`).then((response) => {
            setPostObject(response.data);
        });

        axios.get(`/comment/${id}`).then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const addComment = () => {
        axios
            .post("/comment/", {
                text: newComment,
                PostId: id,
            },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = { text: newComment };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
    };

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="text">{postObject.text}</div>
                    <div className="postImage">{postObject.postImage}</div>
                    <div className="userId">{postObject.userId}</div>
                </div>
            </div>
            <div className="rightSide">
                <div className='addCommentContainer'>
                    <input type="text"
                        placeholder='Commentaire...'
                        autoComplete='off'
                        value={newComment}
                        onChange={(event) => {
                            setNewComment(event.target.value);
                        }}
                    />
                    <button onClick={addComment}>Ajouter un Commentaire</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'>
                                {comment.text}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;