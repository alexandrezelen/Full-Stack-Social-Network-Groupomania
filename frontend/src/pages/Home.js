import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';

function Home() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/post").then((response) => {
            setPost(response.data);
        });
    }, []);

    return (
        <div>{post.map((value, key) => {
            return (
                <div className="post">
                    <div className="title"> {value.title} </div>
                    <div className="text">{value.text}</div>
                    <div className="userId">{value.userId}</div>
                </div>
            );
        })}</div>
    );
}

export default Home;