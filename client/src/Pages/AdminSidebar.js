import React, { useState } from 'react';
import "../styles/AdminSidebarStyle.css";
import { GiHamburgerMenu } from 'react-icons/gi';

const Sidebar = ({ activeTab, handleTabChange }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="sidebar-container">
            <div className={`sidebar ${sidebarVisible ? '' : 'hidden'}`}>
                {sidebarVisible && (
                    <>
                        <div className="sidebar-header">
                            Admin Panel
                            <hr className="sidebar-hr" />
                        </div>
                        <ul className="sidebar-menu">
                            <li className={`sidebar-menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabChange('users')}>
                                <i className="fa-solid fa-user"></i> Users
                            </li>
                            <li className={`sidebar-menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => handleTabChange('products')}>
                                <i className="fa-solid fa-shirt"></i> Products
                            </li>
                            <li className={`sidebar-menu-item ${activeTab === 'slideshow' ? 'active' : ''}`} onClick={() => handleTabChange('slideshow')}>
                                <i className="fa-solid fa-image"></i> Slideshow
                            </li>
                            <li className={`sidebar-menu-item ${activeTab === 'aboutUs' ? 'active' : ''}`} onClick={() => handleTabChange('aboutUs')}>
                                <i className="fa-solid fa-circle-info"></i> About Us
                            </li>
                            <li className={`sidebar-menu-item-home ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>
                                <i className='fa-solid fa-house'></i> Home
                            </li>
                        </ul>
                        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                            <GiHamburgerMenu />
                        </button>
                    </>
                )}
            </div>
            {!sidebarVisible && (
                <button className="sidebar-toggle-btn-alt" onClick={toggleSidebar}>
                    <GiHamburgerMenu />
                </button>
            )}
        </div>
    );
};

export default Sidebar;