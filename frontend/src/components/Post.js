import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function Post() {
    let { id } = useParams();
    const postId = id;
    console.log(id, postId);

    const [postObject, setPostObject] = useState({ title: "title", text: 'text', postImage: "", User: { firstname: "firstname", lastname: "lastname" } });
    const [comments, setComments] = useState(['text']);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState(['text']);

    const addComment = () => {
        const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
        axios.post(`/comment/${postId}`, { text: newComment, PostId: postId }, Headers)
            .then((response) => {
                const commentToAdd = { text: newComment };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            })
            .catch(error => console.log(error));
    };

    // const deleteComment = (event) => {
    //     console.log(event)
    //     const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
    //     axios.delete(`/comment/${event.data.id}`, Headers)
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch(error => console.log(error));
    // };

    useEffect(() => {
        const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
        axios.get(`/post/one/${id}`, Headers).then((res) => { console.log(res.data); setPostObject(res.data); })
            .catch(error => console.log(error));
        axios.get(`/comment/${postId}`, Headers).then((res) => { console.log(res.data); setComments(res.data); }).catch(error => console.log(error));
    }, [id, postId]);

    return (
        <div className="postPage">
            <article className="upSide">
                <div className="post" id="individual">
                    <h2 className="title"> {postObject.title} </h2>
                    <p className="text">{postObject.text}</p>
                    {/* eslint-disable-next-line */}
                    <img className="postImage" src={postObject.postImage} alt="a post image" />
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
                    <button className='commentBttn' onClick={addComment}>Ajouter un Commentaire</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, i) => {
                        i++
                        return (
                            <div className='comment__box'>
                                <div className='comment__text'>
                                    {/* <h3>{comment.User.firstname} {comment.User.lastname}</h3> */}
                                    <p key={i} className='comment'>{comment.text}</p>
                                </div>
                                {/* <p className='delete__comment' id='deleteComment' onClick={deleteComment}>X</p> */}
                            </div>

                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Post;