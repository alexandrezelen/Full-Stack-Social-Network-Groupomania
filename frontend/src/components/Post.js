import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function Post(post) {
    let { id } = useParams();
    const postId = id;
    const [postObject, setPostObject] = useState({ title: "title", text: 'text', postImage: "", User: { firstname: "firstname", lastname: "lastname" } });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const addComment = () => {
        const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
        axios.post(`/comment/${postId}`, { text: newComment, PostId: postId }, Headers)
            .then((res) => {
                let user = res.data.userData;
                const commentToAdd = { text: newComment, User: { firstname: user.firstname, lastname: user.lastname } };
                setComments([...comments, commentToAdd]);
                setNewComment("");
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        function getData() {
            const Headers = { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } };
            axios.get(`/post/one/${id}`, Headers).then((res) => { setPostObject(res.data); }).catch(error => console.log(error));
            axios.get(`/comment/${postId}`, Headers).then((res) => { setComments(res.data); }).catch(error => console.log(error));
        }
        getData();
    }, [id, postId]);

    return (
        <div key={String(post.id)} className="postPage">
            <article className="upSide">
                <div className="post" id="individual">
                    <h2 className="title"> {postObject.title}</h2>
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