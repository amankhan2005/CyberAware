'use client';
import React from 'react';
import Navbar from './Navbar';
import { useProtectedRoute } from '../../utils/auth';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
    const router = useRouter();
    // Protect this route for normal users
    const { loading } = useProtectedRoute(['user', 'admin'], '/login');

    if (loading) {        return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 to-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            <p className="ml-2 text-lg text-teal-400">Loading...</p>
        </div>;
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;