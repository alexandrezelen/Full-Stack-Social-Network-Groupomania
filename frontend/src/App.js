
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
import { useState, useEffect } from 'react';
import { checkUser } from './components/Tool';

function App() {
    const [authState, setAuthState] = useState({
        firstname: "",
        id: 0,
        status: false
    });
    useEffect(() => {
        checkUser().then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    firstname: response.data.firstname,
                    id: response.data.id,
                    status: true
                });
            }
        });
    }, [authState]);

    return (
        <div className='App'>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <BrowserRouter>
                    <div className='navbar'>
                        {!authState.status ? (
                            <>
                                <Link to="/">Forum</Link>
                                <Link to="/createpost">Post</Link>
                                <Link to="/profile">Profil</Link>
                                <Link to="/login" onClick={(e) => {
                                    localStorage.removeItem("accessToken");
                                }}>Déconnexion</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">S'identifier</Link>
                                <Link to="/register">S'enregistrer</Link>
                            </>
                        )}
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="createpost" element={<CreatePost />} />
                        <Route path="post/:id" element={<Post />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="changepassword" element={<ChangePassword />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes >
                </BrowserRouter>
            </AuthContext.Provider>
        </div >
    );
}

export default App;