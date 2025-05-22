'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllQueries, updateQueryStatus, updateQueryPriority } from '@/services/queryService';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ExpertQueriesPage() {
    const router = useRouter();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [solution, setSolution] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleQuerySubmit = async (e) => {
        e.preventDefault();
        if (!solution.trim()) {
            toast.error('Please provide a solution');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('expert-token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post(`${API_BASE_URL}/queries/answer/${selectedQuery._id}`, 
                { solution: solution.trim() },
                config
            );

            // Update queries list
            await fetchQueries();
            
            toast.success('Query answered successfully');
            setSelectedQuery(null);
            setSolution('');
        } catch (error) {
            console.error('Error answering query:', error);
            toast.error('Failed to submit answer');
        } finally {
            setIsSubmitting(false);
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Query Management</h1>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search queries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : queries.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">No queries found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {queries.map((query) => (
                                <div
                                    key={query._id}
                                    className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Link
                                                href={`/queries/${query._id}`}
                                                className="block"
                                            >
                                                <h3 className="text-lg font-semibold text-white mb-2 hover:text-blue-400">
                                                    {query.subject}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-300 line-clamp-2 mb-4">
                                                {query.message}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {query.tags && Array.isArray(query.tags) && query.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-gray-600 text-gray-300 rounded-full text-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>                                        <div className="flex flex-col items-end gap-2 ml-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                {!query.solution && (
                                                    <button
                                                        onClick={() => setSelectedQuery(query)}
                                                        className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
                                                    >
                                                        Answer Query
                                                    </button>
                                                )}
                                            </div>
                                            <select
                                                value={query.status}
                                                onChange={(e) => handleStatusChange(query._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)} border-0 focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                                <option value="closed">Closed</option>
                                            </select>
                                            <select
                                                value={query.priority}
                                                onChange={(e) => handlePriorityChange(query._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(query.priority)} border-0 focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                                <option value="urgent">Urgent</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                                        <div>
                                            <span>Created by: {query.userId?.name || 'Unknown User'}</span>
                                            <span className="mx-2">•</span>
                                            <span>{new Date(query.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span>{query.responses?.length || 0} responses</span>
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
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>                    )}
                </div>

                {/* Answer Query Modal */}
                {selectedQuery && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-2xl">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-white">Answer Query</h3>
                                <button
                                    onClick={() => {
                                        setSelectedQuery(null);
                                        setSolution('');
                                    }}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400 mb-2">User's Query:</p>
                                <p className="text-white bg-gray-700 p-4 rounded-lg">{selectedQuery.message || selectedQuery.doubt}</p>
                            </div>
                            <form onSubmit={handleQuerySubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-400 mb-2">Your Solution:</label>
                                    <textarea
                                        value={solution}
                                        onChange={(e) => setSolution(e.target.value)}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Type your solution here..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedQuery(null);
                                            setSolution('');
                                        }}
                                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}