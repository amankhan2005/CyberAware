'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllQueries, createQuery } from '@/services/queryService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import axios from 'axios';

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
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });

    const formik = useFormik({
        initialValues: {
            subject: '',
            message: '',
            priority: 'medium',
            tags: []
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await createQuery(values);
                toast.success('Query created successfully');
                setShowModal(false);
                resetForm();
                fetchQueries();
            } catch (error) {
                toast.error(error.message || 'Failed to create query');
            }
        }
    });

    const fetchQueries = () => {
        setLoading(true);
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/queries/getall`)
            .then((res) => {
                if (res.data.success) {
                    setQueries(res.data.data);
                }
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Error fetching queries');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchQueries();
    }, []);

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

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/queries/create`, formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success('Query submitted successfully');
                    setFormData({ subject: '', message: '' });
                    fetchQueries();
                }
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || 'Error submitting query');
            });
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-indigo-200 mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                            placeholder="Enter your question subject"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-indigo-200 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                            placeholder="Describe your question in detail"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 font-medium"
                    >
                        Submit Question
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
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        query.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                                        query.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {query.status}
                                    </span>
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