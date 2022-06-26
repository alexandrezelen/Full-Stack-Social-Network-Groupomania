
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
import { useState } from 'react';

function App() {
    const [authState, setAuthState] = useState(false);
        return (
        <div className='App'>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <BrowserRouter>
                    <div className='navbar'>
                        <Link to="/">Forum</Link>
                        <Link to="/createpost">Post</Link>
                        <Link to="/profile">Profil</Link>
                        <Link to="/login" onClick={(e) => {
                            localStorage.removeItem("accessToken");
                        }}>Déconnexion</Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="createpost" element={<CreatePost />} />
                        <Route path="post/:id" element={<Post />} />
                        <Route path="register/:id" element={<Register />} />
                        <Route path="login" ent={<Login />} />
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