import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { FcHome } from "react-icons/fc";
import AuthContext from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
const BNavbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isNavExpanded, setNavExpanded] = useState(false);
  const nav = useNavigate();
  const handleLogout = () => {
    //1) logout context (memory)
    logout();
    //2) logout disk (authService)
    authService.logout();
    //3) nav to /home
    nav("/");
  };

  const closeNav = () => setNavExpanded(false);

  return (
    <>
      <Navbar
        expanded={isNavExpanded}
        onToggle={setNavExpanded}
        bg="light"
        expand="lg"
      >
        {/* container that takes 100% */}
        <Container fluid>
          {/* Brand Our Logo*/}
          <NavLink to="/" className="navbar-brand">
            <span>Blog App</span>
            <FcHome />
          </NavLink>

          {/* Burger Button (hidden in larger devices) */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* Collapse (hidden in smaller devices) */}
          <Navbar.Collapse>
            <Nav
              className="ms-auto"
              onClick={closeNav}
            >
              <NavLink className="btn btn-outline-info" to="/about">
                About
              </NavLink>
              <NavLink className="btn btn-outline-info" to="/">
                Home
              </NavLink>
              {!isLoggedIn && (
                <NavLink className="btn btn-outline-info" to="/register">
                  Register
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink className="btn btn-outline-info" to="/login">
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <NavLink className="btn btn-outline-info" to="/posts">
                  Posts
                </NavLink>
              )}
              {isLoggedIn && (
                <button onClick={handleLogout} className="btn btn-outline-info">
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default BNavbar;
