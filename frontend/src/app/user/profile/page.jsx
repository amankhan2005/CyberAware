'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from '@/utils/jwt_decode';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No user token found. Please login.');
          setLoading(false);
          return;
        }
        const decoded = jwt_decode(token);
        const userId = decoded._id || decoded.id;
        if (!userId) {
          setError('Invalid token.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${API_URL}/users/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-red-500 bg-gray-800/50 p-4 rounded-lg shadow-lg">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-xl mx-auto bg-gray-800/50 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-white">User Profile</h1>
        {userData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-3xl text-white">{userData.name ? userData.name[0].toUpperCase() : '?'}</span>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-indigo-400 text-sm">Name</p>
                <p className="text-white font-medium">{userData.name}</p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-indigo-400 text-sm">Email</p>
                <p className="text-white font-medium">{userData.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-white text-center">No user data available</div>
        )}
      </div>
    </div>
  );
};

export default Profile;