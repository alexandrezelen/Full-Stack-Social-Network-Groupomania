import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Post from './components/Post';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="createpost" element={<CreatePost />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="post/:id" element={<Post />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes >
    );
}

export default App;