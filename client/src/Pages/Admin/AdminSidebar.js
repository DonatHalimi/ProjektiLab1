import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUserCog } from 'react-icons/fa';
import { AdminData } from './AdminData';
import '../../styles/AdminSidebarStyle.css';
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css';

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

    const showHomeConfirmation = () => {
        confirmAlert({
            title: 'Confirm Action',
            message: 'Are you sure you want to go to the home page?',
            buttons: [
                {
                    label: 'Cancel',
                    onClick: () => { }
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        // Redirect to the home page
                        window.location.href = '/';
                    }
                }
            ]
        });
    };

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

                    <div to="/" className={`home-link ${location.pathname === '/' ? 'active' : ''}`} onClick={showHomeConfirmation}>
                        <li>
                            <i className='fa-solid fa-home'></i> Home
                        </li>
                    </div>

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

                    <div className={`home-link ${location.pathname === '/' ? 'active' : ''}`} onClick={showHomeConfirmation}>
                        <li>
                            <i className='fa-solid fa-home'></i>
                        </li>
                    </div>

                    <button className="sidebar-toggle-btn-clicked" onClick={toggleSidebar}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
