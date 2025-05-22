'use client';
import React from 'react';
import { useAuth } from '../utils/auth';

/**
 * A component that conditionally renders content based on authentication state
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to show when authenticated with the right role
 * @param {string|array} props.requiredRole - Role or roles required to view the content
 * @param {React.ReactNode} props.fallback - Content to show when not authenticated (optional)
 * @param {boolean} props.showLoading - Whether to show loading state (default: true)
 */
const AuthGuard = ({ children, requiredRole, fallback = null, showLoading = true }) => {
    const { loading, isAuthenticated, hasRequiredRole } = useAuth(requiredRole);

    if (loading && showLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-2 text-sm text-gray-600">Verifying access...</p>
            </div>
        );
    }

    if (!isAuthenticated || !hasRequiredRole) {
        return fallback;
    }

    return children;
};

export default AuthGuard;
