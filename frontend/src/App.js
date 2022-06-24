import { BrowserRouter, Link } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import { checkUser } from './components/Tool';

let profile = checkUser();

function App() {
    const [authState, setAuthState] = useState(false);
    const [user, setUser] = useState({ id: 0, isAdmin: false });
    let token = JSON.parse(localStorage.getItem('accessToken'));
    let profile = checkUser();


    // useEffect(() => {
    //     let profile = checkUser();
    //     if( profile.id !== 0) { return setUser({id: profile.id, isAdmin: profile.isAdmin }) }
    // }, []);

    return (
        <div className='App'>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <BrowserRouter>
                    <div className='navbar'>
                        {
                        user.id !== 0 ? (
                            console.log(id);
                            <>
                                <Link to="/">Forum</Link>
                                <Link to="/createpost">Post</Link>
                                <Link to="/profile">Profil</Link>
                                <Link to="/login" onClick={(e) => { localStorage.removeItem("accessToken"); setAuthState = false; }}>Déconnexion</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Connexion</Link>
                                <Link to="/register">S'enregistrer</Link>
                            </>
                        )
                        }
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="createpost" element={<CreatePost />} />
                        <Route path="post/:id" element={<Post />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile/:id" element={<Profile />} />
                        <Route path="changepassword" element={<ChangePassword />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes >
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;