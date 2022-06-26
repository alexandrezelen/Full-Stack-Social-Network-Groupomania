import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { checkUser } from '../components/Tool';

function Profile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        let id = '';
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
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
        </div>
    );
}

export default Profile;