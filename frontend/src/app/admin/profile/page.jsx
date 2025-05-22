'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {        // Check for admin token in multiple possible storage locations
        const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
        if (!token) {
          setError('No admin token found. Please login as admin.');
          router.push('/admin_login');
          setLoading(false);
          return;
        }
        
        const decoded = jwtDecode(token);
        const userId = decoded._id || decoded.id;
        const userRole = decoded.role;
        
        // Check if user has admin role
        if (!userId) {
          setError('Invalid token.');
          setLoading(false);
          router.push('/admin_login');
          return;
        }
        
        // Validate if the user is an admin
        if (userRole !== 'admin') {
          setError('Access denied. Admin privileges required.');
          toast.error('Access denied. Admin privileges required.');
          router.push('/admin_login');
          setLoading(false);
          return;
        }        const res = await axios.get(`${API_URL}/users/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Check the response structure and extract user data
        const userData = res.data.user || res.data.data || res.data;
        
        if (!userData) {
          setError('User data not found.');
          toast.error('Failed to retrieve user profile.');
          setLoading(false);
          return;
        }
        
        // Additional role check from backend response
        if (userData.role !== 'admin') {
          setError('Access denied. Admin privileges required.');
          toast.error('Access denied. Admin privileges required.');
          router.push('/admin_login');
          localStorage.removeItem('admin-token');
          setLoading(false);
          return;
        }
        
        setUser(userData);
      } catch (err) {
        console.error('Profile error:', err);
        setError('Failed to load user profile.');
        toast.error('Failed to load user profile.');
        router.push('/admin_login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
        <div className="text-indigo-400">Loading profile...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8 max-w-md w-full">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <button 
          onClick={() => router.push('/admin_login')}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition"
        >
          Back to Login
        </button>
      </div>    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AdminNavbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-8">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">Admin Profile</h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Full Name</span>
              <span className="text-white text-lg">
                {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Email Address</span>
              <span className="text-white text-lg">{user?.email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Role</span>
              <span className="text-white text-lg capitalize">{user?.role || 'Administrator'}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-400 text-sm">Account Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1 w-fit">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;