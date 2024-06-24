import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { MenuData } from "./MenuData";
import LogoImage from '../img/Logo.png';
import "../styles/NavbarStyle.css";
import AuthService from '../services/auth.service';
import CartService from '../services/cart.service'; // Import the cart service

const Navbar = (props) => {
  const [clicked, setClicked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalItems, setTotalItems] = useState(0); // State to hold total items count
  const location = useLocation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      fetchTotalItems(user.id); // Fetch total items initially
    }

    // Setup interval to periodically fetch total items count (every 30 seconds for example)
    const interval = setInterval(() => {
      if (user) {
        fetchTotalItems(user.id);
      }
    }, 20); // Adjust interval as needed

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Function to fetch total items count from CartService
  const fetchTotalItems = async (userId) => {
    try {
      const response = await CartService.getTotalItems(userId);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error('Error fetching total items:', error);
    }
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

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
                {item.title} {item.showTotalItems && `(${totalItems})`}
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
