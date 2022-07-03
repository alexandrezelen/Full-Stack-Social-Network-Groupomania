import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { checkUser } from '../components/Tool';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Profile() {
    let history = useNavigate();
    let id = '';
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const deleteAccount = () => {
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
            id = res.id;
            console.log(id);
            axios.delete(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                history('/login');
            });
            ;
        });
    };

    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            id = res.id;
            console.log(id);
            axios.get(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                setFirstname(response.data.user.firstname);
                setLastname(response.data.user.lastname);
                setEmail(response.data.user.email);
            });
            ;
        });
    }, [id]);

    return (
        <div className="basicInfo">
            <p>Prénom : {firstname}</p>
            <p>Nom : {lastname}</p>
            <p>Email : {email}</p>
            <p className='deleteAccount'>Suppression du compte ?</p>
            <FontAwesomeIcon onClick={deleteAccount} icon={faTrashCan} className="trash" />
        </div>
    );
}

export default Profile;