import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className="navbar">
      <Link to="/">Fil d'actualité</Link>
      <Link to="/createpost">Créer un Post</Link>
      <Link to="/register">S'enregistrer</Link>
      <Link to="/login">Se connecter</Link>
      <Link to="/profile">Profil</Link>
      <Link to="/login" onClick={ e => localStorage.removeItem("accessToken") }>Log Out</Link>
    </div>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);