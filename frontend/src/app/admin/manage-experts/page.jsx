'use client';
import React, { useEffect, useState } from "react";

const ManageExperts = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const expertsPerPage = 6;

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_BASE_URL}/experts/getall`);
                if (!response.ok) throw new Error("Failed to fetch experts");
                const data = await response.json();
                setExperts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    const handleVerificationUpdate = async (expertId, isVerified) => {
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/experts/update/${expertId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isVerified }),
            });

            if (!response.ok) throw new Error("Failed to update expert verification status");
            
            // Update the local state to reflect the change
            setExperts(experts.map(expert => 
                expert._id === expertId ? { ...expert, isVerified } : expert
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleStatusUpdate = async (expertId, isActive) => {
        try {
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/experts/update/${expertId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isActive }),
            });

            if (!response.ok) throw new Error("Failed to update expert status");
            
            // Update the local state to reflect the change
            setExperts(experts.map(expert => 
                expert._id === expertId ? { ...expert, isActive } : expert
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    // Pagination logic
    const indexOfLastExpert = currentPage * expertsPerPage;
    const indexOfFirstExpert = indexOfLastExpert - expertsPerPage;
    const currentExperts = experts.slice(indexOfFirstExpert, indexOfLastExpert);
    const totalPages = Math.ceil(experts.length / expertsPerPage);

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
                        Manage Experts
                    </h1>
                    <div className="text-slate-400">
                        Total Experts: {experts.length}
                    </div>
                </div>

                {/* Experts Grid */}
                {experts.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-lg">No experts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentExperts.map((expert) => (
                            <div
                                key={expert._id}
                                className="bg-indigo-950/40 backdrop-blur-sm border border-indigo-800/30 rounded-lg p-6 hover:bg-indigo-900/30 transition-colors"
                            >
                                <div className="flex flex-col h-full">
                                    <h3 className="text-teal-400 font-semibold text-lg mb-2">
                                        {expert.firstName} {expert.lastName}
                                    </h3>
                                    <p className="text-slate-300 mb-2">
                                        {expert.email}
                                    </p>
                                    <div className="text-sm text-slate-400 mb-4">
                                        <p>Expertise: {expert.expertise?.join(', ')}</p>
                                        <p>Experience: {expert.yearsExperience} years</p>
                                        <p>Articles: {expert.articles?.length || 0}</p>
                                        <p>Joined: {new Date(expert.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-indigo-800/30">
                                        <div className="flex justify-between items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    expert.isVerified 
                                                        ? 'bg-green-500/20 text-green-400' 
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                }`}>
                                                    {expert.isVerified ? 'Verified' : 'Unverified'}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    expert.isActive 
                                                        ? 'bg-blue-500/20 text-blue-400' 
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {expert.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleVerificationUpdate(expert._id, !expert.isVerified)}
                                                    className={`px-3 py-1 rounded text-sm ${
                                                        expert.isVerified
                                                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                                                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                    }`}
                                                >
                                                    {expert.isVerified ? 'Unverify' : 'Verify'}
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(expert._id, !expert.isActive)}
                                                    className={`px-3 py-1 rounded text-sm ${
                                                        expert.isActive
                                                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                            : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                                    }`}
                                                >
                                                    {expert.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
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
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    currentPage === index + 1
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

export default ManageExperts;