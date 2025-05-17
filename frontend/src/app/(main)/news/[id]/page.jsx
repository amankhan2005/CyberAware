'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';

const NewsArticle = () => {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [claps, setClaps] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        const date = new Date(dateString);
        return isValid(date) ? format(date, 'MMM d, yyyy') : 'Invalid date';
    };

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/articles/getbyid/${id}`);
            console.log('Fetched article:', res.data);
            setArticle(res.data);
        } catch (err) {
            console.error('Error fetching article:', err);
            setError('Failed to load article. Please try again later.');
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Content */}
            <div className="flex gap-8">
                {/* Article Content */}
                <div className="flex-grow max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-5">{article.title}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <img 
                                    src={article.expertId?.profileImage || '/expert.jpg'} 
                                    alt={authorName}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium capitalize">{authorName}</p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(article.createdAt)} · {article.views || 0} views
                                    </p>
                                </div>
                            </div>
                            <button 
                                className={`px-4 py-2 rounded-full ${isFollowing ? 'bg-gray-200' : 'bg-black text-white'}`}
                                onClick={() => setIsFollowing(!isFollowing)}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    </div>

                    {/* Article Body */}
                    <article className="prose lg:prose-xl">
                        <img 
                            src={article.image} 
                            alt="" 
                            className='w-full h-auto object-cover rounded-lg mb-8'
                        />
                        <div dangerouslySetInnerHTML={{ __html: article.content }} className='text-lg'/>
                    </article>

                    {/* Interactions */}
                    <div className="flex items-center gap-4 my-8">
                        <button 
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100"
                            onClick={() => setClaps(c => c + 1)}
                        >
                            👏 {claps.toLocaleString()}
                        </button>
                        <span className="text-gray-500">{article.comments?.length || 0} responses</span>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="hidden md:block w-80 flex-shrink-0">
                    <div className="sticky top-20">
                        {/* Author Info */}
                        <div className="border-b pb-4 mb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <img 
                                    src={article.expertId?.profileImage || '/expert.jpg'} 
                                    alt={authorName}
                                    className="w-14 h-14 rounded-full"
                                />
                                <div>
                                    <p className="font-medium capitalize">{authorName}</p>
                                    <p className="text-sm text-gray-500">
                                        {article.expertId?.articles?.length || 0} articles
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">{article.expertId?.bio || 'No bio available'}</p>
                        </div>

                        {/* More Articles */}
                        <div className="mb-8">
                            <h3 className="font-medium mb-4">More from {authorName}</h3>
                            {article.expertId?.articles?.slice(0, 3).map(relatedArticle => (
                                <div key={relatedArticle._id} className="mb-4">
                                    <p className="font-medium text-sm">{relatedArticle.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(relatedArticle.createdAt)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsArticle;