import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useNavigate();

    useEffect(() => {
        axios.get("/post/", { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } })
            .then((res) => { console.log(res); setListOfPosts(res.data); })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>{listOfPosts.map((value, key) => {
            return (
                <div key={key} className="post" onClick={() => { history(`/post/${value.id}`); }}>
                    <h2 className="title"> {value.title} </h2>
                    <p className="text">{value.text}</p>
                    <img className='postImage' src={value.postImage} alt="" />
                </div>
            );
        })}</div>
    );
}

export default Home;