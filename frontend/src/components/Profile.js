import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {

    let { id } = useParams();
    let history = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`/user/${id}`).then((response) => {
            setFirstname(response.data.firstname);
        });

        axios.get(`/post/getByUserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });
    }, [id]);

    return (
        <div className='profilePageContainer'>
            <div className="basicInfo">
                {" "}
                <h1>{firstname}</h1>
                {authState.firstname === firstname && (
                    <button
                        onClick={() => {
                            history('/changepassword');
                        }}
                    >
                        {" "}
                        Changer le mot de passe
                    </button>
                )}
            </div>
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title"> {value.title} </div>
                            <div
                                className="text"
                                onClick={() => {
                                    history(`/post/${value.id}`);
                                }}
                            >
                                {value.text}
                            </div>
                            <div className="footer">
                                <div className="firstname">{value.firstname}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;