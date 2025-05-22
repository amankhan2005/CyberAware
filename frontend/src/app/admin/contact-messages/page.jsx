'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavbar from '../AdminNavbar';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const messagesPerPage = 10; const fetchMessages = async () => {
        try {
            // Get admin token or regular token
            const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
            if (!token) {
                toast.error('Please login as admin first');
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/contact?page=${currentPage}&limit=${messagesPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setMessages(response.data.messages);
            setTotalPages(Math.ceil(response.data.total / messagesPerPage));
        } catch (error) {
            console.error('Error fetching messages:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [currentPage]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <AdminNavbar />
            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => fetchMessages()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-400 text-lg">No messages found</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div
                                        key={message?._id || Math.random()}
                                        className="bg-gray-700 border border-gray-600 rounded-lg p-6 hover:shadow-xl transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {message?.name || 'Anonymous'}
                                                </h3>
                                                <p className="text-blue-400 hover:text-blue-300">
                                                    {message?.email || 'No email provided'}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-400">
                                                {message?.createdAt ? formatDate(message.createdAt) : 'Date not available'}
                                            </span>
                                        </div>
                                        <div>
                                            {message?.subject && (
                                                <h4 className="text-md font-medium text-teal-400 mb-2">
                                                    {message.subject}
                                                </h4>
                                            )}
                                            <p className="text-gray-300 whitespace-pre-wrap">
                                                {message?.message || 'No message content'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8 gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}