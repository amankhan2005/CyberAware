'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const NewsArticle = () => {    const { id } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
    };
    
    const fetchArticle = async () => {
        try {
            setLoading(true);
            // Use the correct endpoint that matches the backend route
            const res = await axios.get(`${API_URL}/news/getbyid/${id}`);
            if (res.data && res.data.data) {
                setArticle(res.data.data);
                // View count is already updated by backend when fetching article
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article. Please try again later.');
            toast.error('Failed to load article');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }
    
    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Article not found</div>
            </div>
        );
    }

    // Use the source as the author name instead of expert
    const authorName = article.source || 'Unknown Source';

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Article Content */}
                    <div className="flex-grow max-w-4xl">
                        {/* Header */}
                        <div className="bg-gray-800 rounded-lg p-6 mb-8">
                            <h1 className="text-4xl font-bold mb-5 text-white">{article.title}</h1>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="font-medium text-white">Source: {authorName}</p>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(article.createdAt)} · {article.views || 0} views
                                        </p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        {/* Article Body */}
                        <article className="bg-gray-800 rounded-lg p-6 mb-8">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-auto object-cover rounded-lg mb-8"
                            />
                            <div
                                dangerouslySetInnerHTML={{ __html: article.content }}
                                className="prose prose-invert lg:prose-xl max-w-none text-white"
                            />
                        </article>                        
                        {/* Interactions */}
                        <div className="flex items-center gap-4 my-8">
                            <Link
                                href="/news"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to News
                            </Link>
                            <a
                                href={article.sourceUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                Visit Source
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>                    
                    {/* Sidebar */}
                    <div className="md:w-80 flex-shrink-0">
                        <div className="sticky top-20 bg-gray-800 rounded-lg p-6">
                            {/* Source Info */}
                            <div className="border-b border-gray-700 pb-4 mb-4">
                                <h3 className="text-xl font-medium text-white mb-2">About the Source</h3>
                                <p className="text-sm text-gray-300 mb-4">{authorName}</p>

                                {article.sourceUrl && (
                                    <a
                                        href={article.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 hover:text-blue-300"
                                    >
                                        Visit Source Website
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            {/* Category Info */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-white mb-3">Category</h3>
                                <div className="flex">
                                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Back to News */}
                            <div>
                                <button
                                    onClick={() => router.push('/news')}
                                    className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to News
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;