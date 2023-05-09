//react ui component
//<nav>link1 link2 link3</nav>
import { useContext } from "react";
import { FcHome } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <NavLink className="nav-item nav-brand" to="/">
        <FcHome />
      </NavLink>
      <NavLink to="/about">About</NavLink>
      {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
      {isLoggedIn && <NavLink to="/posts">Posts</NavLink>}
    </nav>
  );
};

export default Navbar;
