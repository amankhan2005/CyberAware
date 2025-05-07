'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllQueries, createQuery } from '@/services/queryService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

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

export default function QueriesPage() {
    const router = useRouter();
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

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

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const response = await getAllQueries(currentPage, 10, {
                search: searchTerm,
                status: selectedStatus
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
    }, [currentPage, searchTerm, selectedStatus]);

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
                    <h1 className="text-3xl font-bold text-gray-900">My Queries</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        New Query
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search queries..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                                <Link
                                    href={`/queries/${query._id}`}
                                    key={query._id}
                                    className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {query.subject}
                                            </h3>
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
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)}`}>
                                                {query.status.replace('_', ' ')}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(query.priority)}`}>
                                                {query.priority}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
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

            {/* New Query Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold mb-6">Create New Query</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    {formik.touched.subject && formik.errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.subject}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    ></textarea>
                                    {formik.touched.message && formik.errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <select
                                        name="priority"
                                        value={formik.values.priority}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tags (comma-separated)
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formik.values.tags.join(', ')}
                                        onChange={(e) => {
                                            const tags = e.target.value
                                                .split(',')
                                                .map((tag) => tag.trim())
                                                .filter((tag) => tag.length > 0);
                                            formik.setFieldValue('tags', tags);
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    Create Query
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
} 