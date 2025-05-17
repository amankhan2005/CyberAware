'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllQueries, updateQueryStatus, updateQueryPriority } from '@/services/queryService';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ExpertQueriesPage() {
    const router = useRouter();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const response = await getAllQueries(currentPage, 10, {
                search: searchTerm,
                status: selectedStatus,
                priority: selectedPriority
            });
            setQueries(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            toast.error(error.message || 'Failed to fetch queries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, [currentPage, searchTerm, selectedStatus, selectedPriority]);

    const handleStatusChange = async (queryId, newStatus) => {
        try {
            await updateQueryStatus(queryId, newStatus);
            toast.success('Status updated successfully');
            fetchQueries();
        } catch (error) {
            toast.error(error.message || 'Failed to update status');
        }
    };

    const handlePriorityChange = async (queryId, newPriority) => {
        try {
            await updateQueryPriority(queryId, newPriority);
            toast.success('Priority updated successfully');
            fetchQueries();
        } catch (error) {
            toast.error(error.message || 'Failed to update priority');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            resolved: 'bg-green-100 text-green-800',
            closed: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800'
        };
        return colors[priority] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Query Management</h1>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search queries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : queries.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No queries found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {queries.map((query) => (
                                <div
                                    key={query._id}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Link
                                                href={`/queries/${query._id}`}
                                                className="block"
                                            >
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600">
                                                    {query.subject}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-600 line-clamp-2 mb-4">
                                                {query.message}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {query.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 ml-4">
                                            <select
                                                value={query.status}
                                                onChange={(e) => handleStatusChange(query._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)} border-0 focus:ring-2 focus:ring-indigo-500`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            <select
                                                value={query.priority}
                                                onChange={(e) => handlePriorityChange(query._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(query.priority)} border-0 focus:ring-2 focus:ring-indigo-500`}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                        <div>
                                            <span>Created by: {query.userId.name}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(query.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span>{query.responses.length} responses</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === page
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 