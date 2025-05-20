'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllQueries, createQuery } from '@/services/queryService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';
import jwt_decode from '@/utils/jwt_decode';

const validationSchema = Yup.object({
    subject: Yup.string()
        .required('Subject is required')
        .min(5, 'Subject must be at least 5 characters')
        .max(100, 'Subject must not exceed 100 characters'),
    message: Yup.string()
        .required('Message is required')
        .min(20, 'Message must be at least 20 characters')
        .max(1000, 'Message must not exceed 1000 characters'),
    priority: Yup.string()
        .oneOf(['low', 'medium', 'high', 'urgent'], 'Invalid priority level')
        .default('medium'),
    tags: Yup.array()
        .of(Yup.string().trim())
        .max(5, 'Maximum 5 tags allowed')
});

const QueriesPage = () => {
    const router = useRouter();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const formik = useFormik({
        initialValues: {
            subject: '',
            message: '',
            tags: []
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                // Get user ID from token
                const token = localStorage.getItem('token');
                let userId = null;
                if (token) {
                    const decoded = jwt_decode(token);
                    userId = decoded._id || decoded.id;
                }
                if (!userId) {
                    toast.error('User not authenticated. Please login.');
                    return;
                }
                const payload = { ...values, user: userId };
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const response = await axios.post(`${API_URL}/queries/create`, payload);
                if (response.data.success) {
                    toast.success('Query submitted successfully');
                    resetForm();
                    fetchQueries();
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to create query');
            }
        }
    });

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/queries/getall`);
            if (response.data.success) {
                setQueries(response.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching queries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500/20 text-yellow-400',
            in_progress: 'bg-blue-500/20 text-blue-400',
            resolved: 'bg-green-500/20 text-green-400',
            closed: 'bg-gray-500/20 text-gray-400'
        };
        return colors[status] || 'bg-gray-500/20 text-gray-400';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white p-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-center mb-4">
                    <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Ask Your Questions
                    </span>
                </h1>
                <p className="text-slate-300 text-center">
                    Get expert advice on cybersecurity concerns
                </p>
            </div>

            {/* Query Form */}
            <div className="max-w-4xl mx-auto bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6 mb-8">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-indigo-200 mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            {...formik.getFieldProps('subject')}
                            className={`w-full px-4 py-2 rounded-lg bg-indigo-950/50 border ${
                                formik.touched.subject && formik.errors.subject 
                                    ? 'border-red-500/50' 
                                    : 'border-indigo-700/40'
                            } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white`}
                            placeholder="Enter your question subject"
                        />
                        {formik.touched.subject && formik.errors.subject && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.subject}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...formik.getFieldProps('message')}
                            rows="4"
                            className={`w-full px-4 py-2 rounded-lg bg-indigo-950/50 border ${
                                formik.touched.message && formik.errors.message 
                                    ? 'border-red-500/50' 
                                    : 'border-indigo-700/40'
                            } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white`}
                            placeholder="Describe your question in detail"
                        />
                        {formik.touched.message && formik.errors.message && (
                            <p className="mt-1 text-sm text-red-400">{formik.errors.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 font-medium disabled:opacity-50"
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Submit Question'}
                    </button>
                </form>
            </div>

            {/* Queries List */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4 text-indigo-200">Recent Questions</h2>
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                    </div>
                ) : queries.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                        No questions yet. Be the first to ask!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {queries.map((query) => (
                            <div
                                key={query._id}
                                className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-medium text-teal-400">{query.subject}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                                            {query.status}
                                        </span>
                                        {query.priority && (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                query.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                                                query.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                query.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-green-500/20 text-green-400'
                                            }`}>
                                                {query.priority}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-slate-300 mb-4">{query.message}</p>
                                {query.responses && query.responses.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-indigo-800/30">
                                        <h4 className="text-sm font-medium text-indigo-200 mb-2">Responses:</h4>
                                        {query.responses.map((response, index) => (
                                            <div key={index} className="bg-indigo-900/20 rounded-lg p-3 mb-2">
                                                <p className="text-slate-300 text-sm">{response.message}</p>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    {new Date(response.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QueriesPage;