import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { checkUser } from '../components/Tool';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Profile() {
    // The useNavigate hook returns a function that lets you navigate programmatically,
    // for example after a form is submitted.
    let history = useNavigate();
    let id = '';
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const deleteAccount = () => {
        // We retrieve the token
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
            id = res.id;
            console.log(id);
            // We delete the user id
            axios.delete(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                // we are redirected to login page
                history('/login');
            });
            ;
        });
    };

    useEffect(() => {
        // Accepts a function that contains imperative, possibly effectful code.
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            id = res.id;
            console.log(id);
            // We retrieve the user id
            axios.get(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                // We set the data
                setFirstname(response.data.user.firstname);
                setLastname(response.data.user.lastname);
                setEmail(response.data.user.email);
            });
            ;
        });
    }, [id]);

    return (
        // Integration in the DOM
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