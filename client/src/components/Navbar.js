import React, { useState } from "react";
import { MenuData } from "./MenuData";
import "./NavbarStyle.css";

// Krijohet komponenti Navbar
const Navbar = (props) => {

  // Krijohet state 'clicked' dhe funksioni 'setClicked' duke perdorur useState
  const [clicked, setClicked] = useState(false);

  // Krijohet funksioni 'handleClick' per ndryshimin e gjendjes se 'clicked'
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className="NavbarItems">

      {/* Krijimi i logose*/}
      <h1 className="logo">Ruby</h1>

      {/* Krijimi i  ikonave te menyse */}
      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      {/* Krijimi i listes se menyse */}
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuData.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;