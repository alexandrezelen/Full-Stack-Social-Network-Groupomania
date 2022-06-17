import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Profile() {

    let { id } = useParams();
    let history = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    

    useEffect(() => {
        axios.get(`/user/${id}`).then((response) => {
            setFirstname(response.data.firstname);
        }); 
    }, [id]);

    return (
        <div className='profilePageContainer'>
            <div className="basicInfo">
                {" "}
                <h1>{firstname}</h1>
                {firstname === firstname && (
                    <button onClick={() => { history('/changepassword'); }} >
                     
                        Changer le mot de passe
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;