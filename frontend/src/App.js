import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import CreatePost from './pages/CreatePost';
import Home from "./pages/Home";
// import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <main className='App'>
      <BrowserRouter>
        <div className='navbar'>
          <Link to="/"> Fil d'actualité</Link>
          {/* <Link to="/createpost"> Créer un Post</Link> */}
          <Link to="/registration"> S'enregistrer</Link>
          <Link to="/Login"> Se connecter</Link>
        </div>  
        <Routes>
          {/* <Route path="/createpost" element={<CreatePost />} /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="/post/:id" element={<Post />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

// function App() {
//     return (
//         <main className='App'>
//             <Register />
//             <Login />
//         </main>
//     );
// }

export default App;