'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {        const token = localStorage.getItem('admin-token');
        if (!token) {
          setError('No admin token found. Please login as admin.');
          router.push('/admin_login');
          setLoading(false);
          return;
        }
        const decoded = jwtDecode(token);
        const userId = decoded._id || decoded.id;
        if (!userId) {
          setError('Invalid token.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${API_URL}/user/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setError('Failed to load user profile.');
        toast.error('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-8 text-indigo-400">Loading profile...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
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
  );
};

export default Profile;