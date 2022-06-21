import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import * as tools from "./components/Tool";

// const notLogged = 
//   <div className="navbar">
//     <Link to="/register">S'enregistrer</Link>
//     <Link to="/login">Connexion</Link>
//   </div>;

// const logged = 
// <div className="navbar">
//   <Link to="/">Actualité</Link>
//   <Link to="/createpost">Post</Link>
//   <Link to="/profile" onClick={ (e) => { 
//     let history = useNavigate();
//     let user = tools.checkUser(); 
//     let id = user.id; 
//     history(`/profile/${id}`); 
//     }}>Profil</Link>
//   <Link to="/login" onClick={ e => localStorage.removeItem("accessToken") }>Déconnexion</Link>
// </div>;




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className="navbar">
      <Link to="/register">S'enregistrer</Link>
      <Link to="/login">Connexion</Link>

      <Link to="/">Actualité</Link>
      <Link to="/createpost">Post</Link>
      <Link to="/profile">Profil</Link>
      <Link to="/login" onClick={ e => localStorage.removeItem("accessToken") }>Déconnexion</Link>
    </div>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);