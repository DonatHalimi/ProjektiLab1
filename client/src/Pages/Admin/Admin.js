import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import UsersTable from '../Tables/UsersTable';
import ProductsTable from '../Tables/ProductsTable';
import CategoryTable from '../Tables/CategoryTable';
import SlideshowTable from '../Tables/SlideshowTable';
import AboutUsTable from '../Tables/AboutUsTable';
import PaymentsTable from '../Tables/PaymentsTable';
import '../../styles/AdminStyle.css'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="admin-page">
      <AdminSidebar activeTab={activeTab} handleTabChange={handleTabChange} />
      <div className="admin-content">
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'products' && <ProductsTable />}
        {activeTab === 'category' && <CategoryTable />}
        {activeTab === 'slideshow' && <SlideshowTable />}
        {activeTab === 'aboutus' && <AboutUsTable />}
      </div>
    </div>
  );
};

export default Admin;