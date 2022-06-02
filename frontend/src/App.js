import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Post from './components/Post';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="createpost" element={<CreatePost />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="post/:id" element={<Post />} />
                <Route path="/" element={<Home />} />
            </Route>
        </Routes >
    );
}

export default App;