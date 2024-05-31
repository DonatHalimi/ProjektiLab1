import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = ({ children, adminOnly }) => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" />;
    }

    if (adminOnly && currentUser.role !== 2) {
        // Redirect to not allowed page if not an admin
        return <Navigate to="/not-allowed" />;
    }

    // Render the children if all checks pass
    return children;
};

export default ProtectedRoute;