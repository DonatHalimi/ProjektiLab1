import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCog } from 'react-icons/fa';
import { AdminData } from './AdminData';
import '../../styles/AdminSidebarStyle.css';

const Sidebar = ({ handleTabChange }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('toggled');
        setSidebarVisible(!sidebarVisible);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                toggleSidebar();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [sidebarVisible]);

    return (
        <div className="sidebar-container">
            {sidebarVisible ? (
                <div className="sidebar">
                    <div className="sidebar-header">Admin Panel</div>
                    <hr className="sidebar-hr" />
                    <ul className="sidebar-menu">
                        {AdminData.map((item) => (
                            <Link to={item.url} key={item.slug} className={`sidebar-menu-item ${location.pathname === item.url ? 'active' : ''}`} onClick={() => handleTabChange(item.slug)}>
                                <li>
                                    <i className={`fa-solid ${item.icon}`}></i> {item.label}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <Link to={"/"} className={`home-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <li>
                            <i className='fa-solid fa-home'></i> Home
                        </li>
                    </Link>

                    <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            ) : (
                <div className="sidebar">
                    <div className="sidebar-header">
                        <FaUserCog style={{ position: "relative", top: "4px", left: "14px" }} />
                    </div>
                    <hr className="sidebar-hr" />
                    <div className="sidebar-content">
                        <ul className="sidebar-menu">
                            {AdminData.map((item) => (
                                <Link to={item.url} key={item.slug} className={`sidebar-menu-item ${location.pathname === item.url ? 'active' : ''}`} onClick={() => handleTabChange(item.slug)}>
                                    <li>
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <Link to={"/"} className={`home-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <li>
                            <i className='fa-solid fa-home'></i>
                        </li>
                    </Link>

                    <button className="sidebar-toggle-btn-clicked" onClick={toggleSidebar}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
