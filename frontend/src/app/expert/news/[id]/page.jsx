'use client';
import { useState, useEffect } from 'react';
import { getNewsById } from '@/services/newsService';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const NewsArticle = () => {
    const { id } = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await getNewsById(id);
                setArticle(response.data);
            } catch (error) {
                toast.error('Failed to fetch article');
                router.push('/news');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!article) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/news"
                    className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 group"
                >
                    <svg
                        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
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
                    Back to News
                </Link>

                <article className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden">
                    <div className="aspect-video relative">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-sm rounded-full backdrop-blur-sm mb-4">
                                {article.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {article.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-indigo-300">
                                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{article.views} views</span>
                                {article.source && (
                                    <>
                                        <span>•</span>
                                        <span>Source: {article.source}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="prose prose-invert max-w-none">
                            <div
                                className="text-indigo-200 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />
                        </div>

                        {article.sourceUrl && (
                            <div className="mt-8 pt-6 border-t border-indigo-800/30">
                                <a
                                    href={article.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-teal-400 hover:text-teal-300"
                                >
                                    Read original article
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsArticle; 