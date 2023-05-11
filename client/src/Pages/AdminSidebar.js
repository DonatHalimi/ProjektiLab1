import React from 'react';
import './AdminSidebarStyle.css';

const Sidebar = ({ activeTab, handleTabChange }) => {

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                Admin Panel
            </div>
            <ul className="sidebar-menu">
                <li className={`sidebar-menu-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabChange('users')}>
                    <i className="fa-solid fa-user"></i> Users
                </li>
                <li className={`sidebar-menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => handleTabChange('products')}>
                    <i className="fa-solid fa-shirt"></i> Products
                </li>
                <li className={`sidebar-menu-item ${activeTab === 'aboutUs' ? 'active' : ''}`} onClick={() => handleTabChange('aboutUs')}>
                    <i className="fa-solid fa-circle-info"></i> About Us
                </li>
                <li className={`sidebar-menu-item-home ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>
                    <i className='fa-solid fa-house'></i> Home
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

