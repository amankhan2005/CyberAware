'use client';
import { useState, useEffect } from 'react';
import { getAllNews, getNewsById } from '@/services/newsService';
import toast from 'react-hot-toast';
import Link from 'next/link';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'Data Breach',
        'Malware',
        'Phishing',
        'Ransomware',
        'Vulnerability',
        'Regulation',
        'Industry News',
        'Other'
    ];

    const fetchNews = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 9,
                search: searchTerm,
                category: selectedCategory
            };
            const response = await getAllNews(params);
            setNews(response.data);
            setTotalPages(response.pagination.pages);
        } catch (error) {
            toast.error('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage, searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            Latest Cybersecurity News
                        </span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Stay informed about the latest cybersecurity threats, breaches, and industry updates.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* News Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <Link
                                href={`/news/${item._id}`}
                                key={item._id}
                                className="group"
                            >
                                <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 overflow-hidden transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-sm rounded-full backdrop-blur-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-teal-400 transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-indigo-300 text-sm mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-indigo-400">
                                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                            <span>{item.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === page
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-indigo-950/50 text-indigo-300 hover:bg-indigo-900/50'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage; 