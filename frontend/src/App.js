import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home";
import Profil from './pages/Profil';
import Post from './pages/Post';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='navbar'>
          <Link to="/"> Fil d'actualité</Link>
          <Link to="/createpost"> Créer un Post</Link>
        </div>
        <Link to="/Profil"> Profil</Link>
        <Routes>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
