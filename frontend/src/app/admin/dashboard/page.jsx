'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import AdminNavbar from '../AdminNavbar';

const AdminDashboard = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    });

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Fetch queries and calculate stats
    const fetchQueries = () => {
        setLoading(true);
        axios.get(`${API_BASE_URL}/queries/getall`)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setQueries(data);

                    // Calculate stats
                    const stats = {
                        total: data.length,
                        pending: data.filter(q => q.status === 'pending').length,
                        inProgress: data.filter(q => q.status === 'in_progress').length,
                        resolved: data.filter(q => q.status === 'resolved').length
                    };
                    setStats(stats);
                }
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Error fetching queries');
            })
            .finally(() => {
                setLoading(false);
            });
    }; useEffect(() => {
        fetchQueries();
    }, []);

    // Handle status update
    const handleStatusUpdate = (queryId, newStatus) => {
        axios.patch(`${API_BASE_URL}/queries/updatestatus/${queryId}`, {
            status: newStatus
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success('Status updated successfully');
                    fetchQueries();
                }
            }).catch((err) => {
                const errorMessage = err.response?.data?.message || 'Error updating status';
                toast.error(errorMessage);
                console.error('Status update error:', {
                    message: errorMessage,
                    response: err.response?.data,
                    status: err.response?.status,
                    fullError: err
                });
            });
    };

    // Handle query deletion
    const handleDelete = (queryId) => {
        if (window.confirm('Are you sure you want to delete this query?')) {
            axios.delete(`${API_BASE_URL}/queries/delete/${queryId}`)
                .then((res) => {
                    if (res.data.success) {
                        toast.success('Query deleted successfully');
                        fetchQueries();
                    }
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || 'Error deleting query');
                });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
            {/* <AdminNavbar /> */}
            <div className="p-6">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            Dashboard
                        </span>
                    </h1>
                    <p className="text-slate-300">Manage and monitor all aspects of the platform</p>
                </div>

                {/* Stats Cards */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6">
                        <h3 className="text-slate-300 text-sm mb-2">Total Queries</h3>
                        <p className="text-3xl font-bold text-teal-400">{stats.total}</p>
                    </div>
                    <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6">
                        <h3 className="text-slate-300 text-sm mb-2">Pending</h3>
                        <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
                    </div>
                    <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6">
                        <h3 className="text-slate-300 text-sm mb-2">In Progress</h3>
                        <p className="text-3xl font-bold text-blue-400">{stats.inProgress}</p>
                    </div>
                    <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6">
                        <h3 className="text-slate-300 text-sm mb-2">Resolved</h3>
                        <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
                    </div>
                </div>

                {/* Queries Table */}
                <div className="max-w-7xl mx-auto bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-indigo-200">Recent Queries</h2>
                        <Link
                            href="/admin/queries"
                            className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg hover:bg-teal-500/30 transition-colors text-sm"
                        >
                            View All
                        </Link>
                    </div>
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                        </div>
                    ) : queries.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                            No queries found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-indigo-800/30">
                                        <th className="pb-4 text-slate-300 font-medium">Subject</th>
                                        <th className="pb-4 text-slate-300 font-medium">Status</th>
                                        <th className="pb-4 text-slate-300 font-medium">Created</th>
                                        <th className="pb-4 text-slate-300 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {queries.slice(0, 5).map((query) => (
                                        <tr key={query._id} className="border-b border-indigo-800/30">
                                            <td className="py-4">
                                                <div>
                                                    <p className="font-medium text-teal-400">{query.subject}</p>
                                                    <p className="text-sm text-slate-400 line-clamp-1">{query.message}</p>
                                                </div>
                                            </td>
                                            <td className="py-4">
                                                <select
                                                    value={query.status}
                                                    onChange={(e) => handleStatusUpdate(query._id, e.target.value)}
                                                    className="bg-indigo-900/50 border border-indigo-700/40 rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-teal-500/50"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td className="py-4 text-slate-300">
                                                {new Date(query.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleDelete(query._id)}
                                                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 