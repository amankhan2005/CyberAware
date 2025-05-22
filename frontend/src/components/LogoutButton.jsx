'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '../utils/auth';

const LogoutButton = ({ className, children }) => {
    const router = useRouter();

    const handleLogout = () => {
        logout(router);
    };

    return (
        <button
            onClick={handleLogout}
            className={className || "px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all duration-300"}
        >
            {children || 'Logout'}
        </button>
    );
};

export default LogoutButton;
