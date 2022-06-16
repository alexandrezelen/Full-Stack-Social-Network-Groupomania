/* eslint-disable no-unused-vars */
import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as tools from "./Tool";

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useNavigate();
    useEffect(() => {
        const response = tools.checkUser();

        axios.get("/post/", {
            headers: {
                'Authorizations': localStorage.getItem('accessToken')
            }
        })
            .then((response) => {
                console.log(response);
                setListOfPosts(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>{listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post" onClick={() => { history(`/post/${value.id}`); }}>
                    <div className="title"> {value.title} </div>
                    <div className="text">{value.text}</div>
                    <div className="userId">
                        <Link to={`/profile/${value.userId}`}>{value.userId}</Link>
                    </div>
                    <img className='postImage' src={value.postImage} alt="" />
                </div>
            );
        })}</div>
    );
}

export default Home;