import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {
    const [post, setPost] = useState([]);
    let history = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/post").then((response) => {
            setPost(response.data);
        });
    }, []);

    return (
        <div>{post.map((value, key) => {
            return (
                <div className="post" onClick={()=>{history(`/post/${value.id}`)}}>
                    <div className="title"> {value.title} </div>
                    <div className="text">{value.text}</div>
                    <div className="userId">{value.userId}</div>
                </div>
            );
        })}</div>
    );
}

export default Home;