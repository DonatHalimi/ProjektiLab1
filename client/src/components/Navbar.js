import React, { useState } from "react";
import { MenuData } from "./MenuData";
import { Link, useLocation } from 'react-router-dom';
import "./Cart";
import LogoImage from '../img/Logo.png';
import "../styles/NavbarStyle.css";

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavbarItems">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }} title="Home">
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
      </ul>
    </nav>
  );
};

export default Navbar;