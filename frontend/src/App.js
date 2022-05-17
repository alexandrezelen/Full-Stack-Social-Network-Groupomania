import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home";
import Profil from './pages/Profil';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to="/createpost"> Créer un Post</Link>
        <Link to="/"> Fil d'actualité</Link>
        <Link to="/Profil"> Profil</Link>
        <Routes>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/Profil" element={<Profil />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
