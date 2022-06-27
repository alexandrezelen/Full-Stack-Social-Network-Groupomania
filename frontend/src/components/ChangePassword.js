import React, { useState } from 'react';
import axios from '../api/axios';

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const changePassword = () => {
        axios.patch('/user/password/', {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {
            headers: {
                'Authorizations': localStorage.getItem('accessToken')
            }
        }
        ).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
        });
    };

    return (
        <div className='passwordContainer'>
            <h1>Modifier le mot de passe</h1>
            <input
                className='passwordInput'
                type='text'
                placeholder='Ancien mot de passe...'
                onChange={(event) => {
                    setOldPassword(event.target.value);
                }}
            />
            <input
                type='text'
                placeholder='Nouveau mot de passe...'
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}
            />
            <button onClick={changePassword}>Enregistrer le nouveau mot de passe</button>
        </div>
    );
}

export default ChangePassword;