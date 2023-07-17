import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import "../styles/AdminSidebarStyle.css";

const Sidebar = ({ activeTab, handleTabChange }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Use effect per me mujt me toggle sidebar me Esc ne tastiere
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
                            <li className={`sidebar-menu-item ${activeTab === 'category' ? 'active' : ''}`} onClick={() => handleTabChange('category')}>
                                <i class="fa-solid fa-box"></i> Categories
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