import React, { useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

function ChangePassword() {
    let { id } = useParams();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const changePassword = () => {
        axios.patch(`/user/password/${id}`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                'Authorizations': localStorage.getItem('accessToken')
            }
        }
        ).then((response) => {
            console.log(response);
            if (response.data.error) {
                alert(response.data.error);
            } else {
                alert('Changement effectué');
            }
        });
    };

    return (
        <div className='passwordContainer'>
            <h1>Modifier le mot de passe</h1>
            <input
                className='passwordInput'
                type='text'
                placeholder='Mot de passe actuel...'
                onChange={(event) => {
                    setOldPassword(event.target.value);
                }}
            />
            <input
                className='passwordInput'
                type='text'
                placeholder='Nouveau mot de passe...'
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}
            />
            <button onClick={changePassword}>Enregistrer</button>
        </div>
    );
}

export default ChangePassword;