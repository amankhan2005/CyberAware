'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getQueryById, addResponse, updateQueryStatus, updateQueryPriority } from '@/services/queryService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const responseSchema = Yup.object({
    message: Yup.string()
        .required('Response is required')
        .min(10, 'Response must be at least 10 characters')
        .max(1000, 'Response must not exceed 1000 characters')
});

export default function QueryDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [query, setQuery] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isExpert, setIsExpert] = useState(false);

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: responseSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await addResponse(id, values);
                toast.success('Response added successfully');
                resetForm();
                fetchQuery();
            } catch (error) {
                toast.error(error.message || 'Failed to add response');
            }
        }
    });

    const fetchQuery = async () => {
        try {
            setLoading(true);
            const response = await getQueryById(id);
            setQuery(response.data);
            // Check if user is an expert
            const userRole = localStorage.getItem('userRole');
            setIsExpert(userRole === 'expert' || userRole === 'admin');
        } catch (error) {
            toast.error(error.message || 'Failed to fetch query');
            router.push('/queries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuery();
    }, [id]);

    const handleStatusChange = async (newStatus) => {
        try {
            await updateQueryStatus(id, newStatus);
            toast.success('Status updated successfully');
            fetchQuery();
        } catch (error) {
            toast.error(error.message || 'Failed to update status');
        }
    };

    const handlePriorityChange = async (newPriority) => {
        try {
            await updateQueryPriority(id, newPriority);
            toast.success('Priority updated successfully');
            fetchQuery();
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!query) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/queries"
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Queries
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{query.subject}</h1>
                            <p className="text-gray-600">{query.message}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            {isExpert && (
                                <>
                                    <select
                                        value={query.status}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)} border-0 focus:ring-2 focus:ring-indigo-500`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <select
                                        value={query.priority}
                                        onChange={(e) => handlePriorityChange(e.target.value)}
                                        className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(query.priority)} border-0 focus:ring-2 focus:ring-indigo-500`}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </>
                            )}
                            {!isExpert && (
                                <>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(query.status)}`}>
                                        {query.status.replace('_', ' ')}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(query.priority)}`}>
                                        {query.priority}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {query.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Responses</h2>
                        <div className="space-y-4 mb-6">
                            {query.responses.map((response, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-900">
                                                {response.responder.name}
                                            </span>
                                            <span className="mx-2 text-gray-500">•</span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(response.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        {response.responder.role === 'expert' && (
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                                Expert
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-700">{response.message}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Add Response
                                </label>
                                <textarea
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Type your response here..."
                                ></textarea>
                                {formik.touched.message && formik.errors.message && (
                                    <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Send Response
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
} 