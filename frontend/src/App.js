import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from "./pages/Home";
import Profil from './pages/Profil';
import Post from './pages/Post';
import Login from './pages/Login';
//import Signin from './pages/Signin'
import Registration from './pages/Registration';
//import Register from './pages/Register';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='navbar'>
          <Link to="/"> Fil d'actualité</Link>
          <Link to="/createpost"> Créer un Post</Link>
          <Link to="/Profil"> Profil</Link>
          <Link to="/registration"> S'enregistrer</Link>
          {/*<Link to="/register"> Register</Link>*/}
          <Link to="/Login"> Se connecter</Link>
          {/*<Link to="/Signin"> Signin</Link>*/}
        </div>
        <Routes>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/registration" element={<Registration />} />
          {/*<Route path="/register" element={<Register />} />*/}
          <Route path="/login" element={<Login />} />
          {/*<Route path="/signin" element={<Signin />} />*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
