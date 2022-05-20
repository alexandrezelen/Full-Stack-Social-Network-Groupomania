import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home";
import Profil from './pages/Profil';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='navbar'>
          <Link to="/"> Fil d'actualité</Link>
          <Link to="/createpost"> Créer un Post</Link>
          <Link to="/Profil"> Profil</Link>
          <Link to="/registration"> S'enregistrer</Link>
          <Link to="/Login"> Se connecter</Link>
        </div>
        <Routes>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
