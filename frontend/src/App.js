// import './App.css';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// // import CreatePost from './pages/CreatePost';
// import Home from "./pages/Home";
// // import Post from './pages/Post';

// function App() {
//   return (
//     <main className='App'>
//       <BrowserRouter>
//         <div className='navbar'>
//           <Link to="/"> Fil d'actualité</Link>
//           {/* <Link to="/createpost"> Créer un Post</Link> */}
//           <Link to="/registration"> S'enregistrer</Link>
//           <Link to="/Login"> Se connecter</Link>
//         </div>  
//         <Routes>
//           {/* <Route path="/createpost" element={<CreatePost />} /> */}
//           <Route path="/" element={<Home />} />
//           {/* <Route path="/post/:id" element={<Post />} /> */}
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </main>
//   );
// }
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
// import Missing from './components/Missing';
// import Unauthorized from './components/Unauthorized';
// import Lounge from './components/Lounge';
// import LinkPage from './components/LinkPage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/* <Route path="linkpage" element={<LinkPage />} /> */}
                {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
                <Route path="/" element={<Home />} />
                {/* <Route path="lounge" element={<Lounge />} /> */}
                {/* catch all */}
                {/* <Route path="*" element={<Missing />} /> */}
            </Route>
        </Routes>
    );
}

export default App;