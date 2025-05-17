'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from '@/utils/jwt_decode';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">User Profile</h1>
      {userData ? (
        <div>
          <p><span className="font-semibold text-indigo-700">Name:</span> {userData.name}</p>
          <p><span className="font-semibold text-indigo-700">Email:</span> {userData.email}</p>
          {userData.city && <p><span className="font-semibold text-indigo-700">City:</span> {userData.city}</p>}
          {/* Add more user fields as necessary */}
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Profile;