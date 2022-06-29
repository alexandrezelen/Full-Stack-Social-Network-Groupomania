import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Profile({ user }) {
    let { id } = useParams();
    let history = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [roleProfile, setRoleProfile] = useState("false");
    const { authState, setAuthState } = useContext(AuthContext);

    const role = authState.isAdmin === "isAdmin";
    console.log(role);

    const deleteUser = () => {
        axios.delete(`user/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        })
            .then((response) => {
                setAuthState({ firstname: "", id: 0, isAdmin: "", status: false });
                alert(authState.status);
                history.push("/");
            });
    };

    useEffect(() => {
        axios.get(`user/${id}`, { headers: { 'Authorizations': JSON.parse(localStorage.getItem('accessToken')) } })
            .then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setEmail(response.data.email);
                setRoleProfile(response.data.isAdmin);
            });
    }, [id]);

    return (
        <div className="basicInfo">
            {" "}
            <p className='firstname'>Prénom : {firstname}</p>
            <p className='lastname'>Nom : {lastname}</p>
            <p className='email'>Email : {email}</p>
            <p className='role'>Profil : {roleProfile}</p>
            {authState.firstname === firstname ? (
                <button className='passwordBttn' onClick={() => {
                    history(`/changepassword/${id}`);
                }}>
                    {" "}
                    Changer le mot de passe</button>
            ) : (
                ""
            )}
            <p className='deleteAccount'>Effacer le compte</p>
            {authState.firstname === firstname || role === true ? (
                <button className='deleteBttn' onClick={deleteUser}></button>
            ) : (
                ""
            )}
        </div>
    );
}

export default Profile;