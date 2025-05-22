'use client';
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Get admin token or regular token
                const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
                if (!token) {
                    setError('Please login as admin first');
                    setLoading(false);
                    toast.error('Please login as admin first');
                    return;
                }

                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_BASE_URL}/users/getall`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) throw new Error("Failed to fetch users");
                const data = await response.json();
                
                // Log the data structure to understand the API response
                console.log('API Response:', data);
                
                // Check if data is an object containing a users array or if it's directly an array
                if (Array.isArray(data)) {
                    setUsers(data);
                } else if (data && (data.users || data.data)) {
                    // Handle both possible API response structures
                    setUsers(data.users || data.data || []);
                } else {
                    // Handle unexpected data structure
                    console.error('Unexpected API response structure:', data);
                    setUsers([]);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                toast.error(err.message || 'Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    const handleStatusUpdate = async (userId, newStatus) => {
        try {
            // Get admin token or regular token
            const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
            if (!token) {
                setError('Please login as admin first');
                toast.error('Please login as admin first');
                return;
            }

            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error("Failed to update user status");

            // Update the local state to reflect the change
            setUsers(users.map(user =>
                user._id === userId ? { ...user, status: newStatus } : user
            ));
            toast.success(`User status updated to ${newStatus}`);
        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Failed to update user status');
        }
    };    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // Ensure users is an array before calling slice
    const currentUsers = Array.isArray(users) ? users.slice(indexOfFirstUser, indexOfLastUser) : [];
    const totalPages = Math.ceil((Array.isArray(users) ? users.length : 0) / usersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-red-500 bg-red-100/10 p-4 rounded-lg">
                Error: {error}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Manage Users
                    </h1>
                    <div className="text-slate-400">
                        Total Users: {users.length}
                    </div>
                </div>

                {/* Users Grid */}
                {users.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-lg">No users found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentUsers.map((user) => (
                            <div
                                key={user._id}
                                className="bg-indigo-950/40 backdrop-blur-sm border border-indigo-800/30 rounded-lg p-6 hover:bg-indigo-900/30 transition-colors"
                            >
                                <div className="flex flex-col h-full">
                                    <h3 className="text-teal-400 font-semibold text-lg mb-2">
                                        {user.name}
                                    </h3>
                                    <p className="text-slate-300 mb-2">
                                        {user.email}
                                    </p>
                                    <div className="text-sm text-slate-400 mb-4">
                                        <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-indigo-800/30">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400">
                                                Status: {user.status || 'Active'}
                                            </span>
                                            <div className="flex gap-2">
                                                {user.status !== 'blocked' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(user._id, 'blocked')}
                                                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors text-sm"
                                                    >
                                                        Block
                                                    </button>
                                                )}
                                                {user.status === 'blocked' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(user._id, 'active')}
                                                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors text-sm"
                                                    >
                                                        Unblock
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-md transition-colors ${currentPage === index + 1
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-indigo-950/40 text-slate-300 hover:bg-indigo-900/30'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUser;