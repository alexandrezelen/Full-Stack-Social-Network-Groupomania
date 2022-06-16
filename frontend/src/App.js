import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';

function App() {
    return (
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
    );
}

export default App;