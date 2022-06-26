import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { checkUser } from '../components/Tool';

function Profile() {
    // let { id } = useParams();
    let id = '';
    const [firstname, setFirstname] = useState('');

    useEffect(() => {        
        let token = JSON.parse(localStorage.getItem('accessToken'));
        checkUser().then((res)=>{
            id = res.id;
            axios.get(`/user/${id}`, { headers: { "Authorizations": token } }).then((response) => {
                console.log(response);
                setFirstname(response.data.user.firstname);
            });
            ;
        })
        
    }, []);

    return (
        <div className='profilePageContainer'>
            <div className="basicInfo">
                {" "}
                <h1>{firstname}</h1>
            </div>
        </div>
    );
}

export default Profile;