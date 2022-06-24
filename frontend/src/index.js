// import './index.css';
// import App from './App';
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <div className="navbar">
//       <Link to="/register">S'enregistrer</Link>
//       <Link to="/login">Connexion</Link>
//       <Link to="/">Actualité</Link>
//       <Link to="/createpost">Post</Link>
//       <Link to="/profile">Profil</Link>
//       <Link to="/login" onClick={e => localStorage.removeItem("accessToken")}>Déconnexion</Link>
//     </div>
//     <Routes>
//       <Route path="/*" element={<App />} />
//     </Routes>
//   </BrowserRouter>
// );

import './index.css';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById('root'))

root.render (<App />)

// ReactDOM.render(
//   <React.StrictMode>
//     (<App />)
//   </React.StrictMode>,
//   document.getElementById("root")
// );