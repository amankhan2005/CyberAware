'use client';
import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminGuard from '../../components/AdminGuard';

const Layout = ({ children }) => {
    return (
        <AdminGuard>
            <AdminNavbar />
            <main>{children}</main>
        </AdminGuard>
    );
};

export default Layout;