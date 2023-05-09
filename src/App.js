//JSX קומפוננטה בראקט = פונקציה שמחזירה

import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Posts from './routes/Posts';
import Register from './routes/Register';
import Login from './routes/Login';
import { useContext } from "react";
import AuthContext from './contexts/AuthContext'
import BNavbar from "./components/BNavbar";
import PostDetails from './routes/PostDetails';
function App() {
const {isLoggedIn} = useContext(AuthContext)
  return (
    <>
      <BNavbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* only if not logged in: login/register routes are available */}
        {!isLoggedIn &&  <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}

        {/* if logged in - posts route is available */}
        {isLoggedIn && <Route path="/posts" element={<Posts />} />}
        {isLoggedIn && <Route path="/posts/:id" element={<PostDetails />} />}
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;