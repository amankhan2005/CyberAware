'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const AdminGuard = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAdminAuth = () => {
            try {                // Check for admin token in multiple possible storage locations
                const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
                
                if (!token) {
                    toast.error('Please login as admin to access this page');
                    router.push('/admin_login');
                    return false;
                }
                
                const decoded = jwtDecode(token);
                const userRole = decoded.role;
                const expiryTime = decoded.exp * 1000; // Convert to milliseconds
                
                // Check token expiration
                if (Date.now() > expiryTime) {
                    toast.error('Your session has expired. Please login again');
                    localStorage.removeItem('admin-token');
                    router.push('/admin_login');
                    return false;
                }
                
                // Check admin role
                if (userRole !== 'admin') {
                    toast.error('Access denied. Admin privileges required');
                    router.push('/admin_login');
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error('Admin authentication error:', error);
                toast.error('Authentication failed');
                router.push('/admin_login');
                return false;
            }
        };
        
        const isAdmin = checkAdminAuth();
        setAuthorized(isAdmin);
        setLoading(false);
    }, [router]);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
                    <div className="text-indigo-400">Verifying admin access...</div>
                </div>
            </div>
        );
    }
    
    if (!authorized) {
        return null; // The useEffect will handle redirects
    }
    
    return children;
};

export default AdminGuard;
