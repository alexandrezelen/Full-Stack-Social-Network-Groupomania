import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as tools from "./Tool"

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    
    let history = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line
        const response = tools.checkUser();

        axios.get("/post/")
            .then((response) => {
                console.log(response);
                setListOfPosts(response.data);
            })
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);

    return (
        <div>{listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post" onClick={() => { history(`/post/${value.id}`); }}>
                    <div className="title"> {value.title} </div>
                    <div className="text">{value.text}</div>
                    <div className="userId">{value.userId}</div>
                    <img className='postImage' src={value.postImage} alt="" />
                </div>
            );
        })}</div>
    );
}

export default Home;
