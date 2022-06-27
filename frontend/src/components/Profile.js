import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { checkUser } from '../components/Tool';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    let history = useNavigate();

    useEffect(() => {
        let id = '';
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
            console.log(res);
            id = res.id;
            axios.get(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                setFirstname(response.data.user.firstname);
                setLastname(response.data.user.lastname);
                setEmail(response.data.user.email);
            });
        });
    }, []);

    return (
        <div className="basicInfo">
            <p className='firstname'>Prénom : {firstname}</p>
            <p className='lastname'>Nom : {lastname}</p>
            <p className='email'>Email : {email}</p>
            <button className='passwordBttn' onClick={() => {
                history("/changepassword");
            }}>Changer le mot de passe</button>
        </div>
    );
}

export default Profile;