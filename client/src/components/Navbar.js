import React, { useState, useEffect } from "react";
import { MenuData } from "./MenuData";
import { Link, useLocation } from 'react-router-dom';
import "./Cart";
import LogoImage from '../img/Logo.png';
import "../styles/NavbarStyle.css";
import AuthService from '../services/auth.service';

// Krijimi i komponentit Navbar
const Navbar = (props) => {
  // Krijimi i state 'clicked' dhe funksioni 'setClicked' duke perdorur useState
  const [clicked, setClicked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null); // Update state to reflect that the user has logged out
  };

  // Renderimi i HTML per Navbar
  return (
    <nav className="NavbarItems">
      <Link to="/Home" className="logo" style={{ textDecoration: 'none' }} title="Home">
        <img src={LogoImage} alt="Logo" style={{ width: '150px', height: 'auto', marginBottom: '10px' }} />
      </Link>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuData.map((item, index) => {
          const isActive = location.pathname === item.url;
          const linkClass = isActive ? `${item.cName} active` : item.cName;

          return (
            <li key={index}>
              <Link to={item.url} className={linkClass}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
        {currentUser ? (
          <>
            <li>
              <Link to="/profile" className="nav-links">
                <i className="fas fa-user"></i> {currentUser.username}
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login" className="nav-links">
              <i className="fas fa-user"></i> Log In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
