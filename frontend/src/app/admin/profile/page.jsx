import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No user token found. Please login.');
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
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">User Profile</h2>
      <div className="mb-2">
        <span className="font-semibold text-indigo-700">Name:</span> {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-indigo-700">Email:</span> {user?.email}
      </div>
      <div className="mb-2">
        <span className="font-semibold text-indigo-700">Role:</span> {user?.role || 'User'}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Profile;