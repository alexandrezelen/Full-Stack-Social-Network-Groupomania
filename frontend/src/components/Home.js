import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        axios.get("/post/", { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } })
            .then((res) => { console.log(res); setListOfPosts(res.data); })
            .catch(err => console.log(err));
    }, []);

    return (
        [...listOfPosts].reverse().map((value, key) => (
            <div key={key} className="post" onClick={() => { history(`/post/${value.id}`); }}>
                <header></header>
                <h1 className="title"> {value.title} </h1>
                <p className="text">{value.text}</p>
                <img className='postImage' src={value.postImage} alt="" />
            </div>
        ))
    );
}

export default Home;