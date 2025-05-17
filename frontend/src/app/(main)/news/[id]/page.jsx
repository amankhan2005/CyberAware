'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const NewsArticle = () => {
    const { id } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [claps, setClaps] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
    };    const fetchArticle = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/news/${id}`);
            if (res.data && res.data.data) {
                setArticle(res.data.data);
                setClaps(res.data.data.claps || 0);
                // Update view count
                await axios.post(`${API_URL}/news/${id}/view`);
            }
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article. Please try again later.');
            toast.error('Failed to load article');
        } finally {
            setLoading(false);
        }
    };    const handleClap = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/news/${id}/clap`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setClaps(prev => prev + 1);
            toast.success('Thanks for your appreciation!');
        } catch (err) {
            console.error('Error updating claps:', err);
            if (err.response?.status === 401) {
                toast.error('Please login to clap');
                router.push('/login');
            } else {
                toast.error('Failed to update claps');
            }
        }
    };    const handleFollow = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to follow experts');
                router.push('/login');
                return;
            }

            if (isFollowing) {
                await axios.post(`${API_URL}/news/${article.expertId._id}/unfollow`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Unfollowed successfully');
            } else {
                await axios.post(`${API_URL}/news/${article.expertId._id}/follow`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Following successfully');
            }
            setIsFollowing(!isFollowing);
        } catch (err) {
            console.error('Error updating follow status:', err);
            if (err.response?.status === 401) {
                toast.error('Please login to follow experts');
                router.push('/login');
            } else {
                toast.error('Failed to update follow status');
            }
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
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

    const authorName = article.expertId ? 
        `${article.expertId.firstName} ${article.expertId.lastName}` : 
        'Unknown Author';

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
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={article.expertId?.profileImage || '/expert.jpg'} 
                                        alt={authorName}
                                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                                    />
                                    <div>
                                        <p className="font-medium text-white capitalize">{authorName}</p>
                                        <p className="text-sm text-gray-400">
                                            {formatDate(article.createdAt)} · {article.views || 0} views
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    className={`px-4 py-2 rounded-full transition-colors ${
                                        isFollowing 
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
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
                                className="prose prose-invert lg:prose-xl max-w-none"
                            />
                        </article>

                        {/* Interactions */}
                        <div className="flex items-center gap-4 my-8">
                            <button 
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                                onClick={handleClap}
                            >
                                👏 {claps.toLocaleString()}
                            </button>
                            <span className="text-gray-400">{article.comments?.length || 0} responses</span>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:w-80 flex-shrink-0">
                        <div className="sticky top-20 bg-gray-800 rounded-lg p-6">
                            {/* Author Info */}
                            <div className="border-b border-gray-700 pb-4 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <img 
                                        src={article.expertId?.profileImage || '/expert.jpg'} 
                                        alt={authorName}
                                        className="w-14 h-14 rounded-full border-2 border-blue-500"
                                    />
                                    <div>
                                        <p className="font-medium text-white capitalize">{authorName}</p>
                                        <p className="text-sm text-gray-400">
                                            {article.expertId?.articles?.length || 0} articles
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300">{article.expertId?.bio || 'No bio available'}</p>
                            </div>

                            {/* More Articles */}
                            {article.expertId?.articles?.length > 0 && (
                                <div>
                                    <h3 className="font-medium text-white mb-4">More from {authorName}</h3>
                                    <div className="space-y-4">
                                        {article.expertId.articles.slice(0, 3).map(relatedArticle => (
                                            <div 
                                                key={relatedArticle._id} 
                                                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                                                onClick={() => router.push(`/news/${relatedArticle._id}`)}
                                            >
                                                <p className="font-medium text-sm text-white">{relatedArticle.title}</p>
                                                <p className="text-sm text-gray-400">
                                                    {formatDate(relatedArticle.createdAt)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;