'use client';

import React, { useState, useEffect } from 'react';
import { getAllNews } from '@/services/newsService';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faEye, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const News = () => {
    // State for news data, filters, and pagination
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Categories array from the model
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

    // Function to fetch news with filters
    const fetchNews = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9 }; // Show 9 news articles per page
            if (search) params.search = search;
            if (category) params.category = category;

            const response = await getAllNews(params);
            
            if (response.success) {
                setNews(response.data);
                setTotalPages(response.pagination.pages);
                setTotalItems(response.pagination.total);
            } else {
                toast.error('Failed to fetch news');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            toast.error('An error occurred while fetching news');
        } finally {
            setLoading(false);
        }
    };

    // Fetch news on initial load and when filters change
    useEffect(() => {
        fetchNews();
    }, [page, category]);

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1); // Reset to first page when searching
        fetchNews();
    };

    // Handle category change
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1); // Reset to first page when changing category
    };

    // Handle pagination
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    // Generate an array of page numbers for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);
            
            // Calculate start and end of visible range
            let start = Math.max(2, page - 1);
            let end = Math.min(totalPages - 1, page + 1);
            
            // Adjust if we're at the beginning or end
            if (page <= 2) {
                end = Math.min(totalPages - 1, 4);
            } else if (page >= totalPages - 1) {
                start = Math.max(2, totalPages - 3);
            }
            
            // Add ellipsis if needed
            if (start > 2) {
                pageNumbers.push('...');
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            
            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pageNumbers.push('...');
            }
            
            // Always show last page
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Latest Cybersecurity News
                    </span>
                </h1>
                
                {/* Search and Filter Section */}
                <div className="backdrop-blur-sm bg-slate-900/50 border border-slate-700/50 p-6 rounded-lg shadow-md mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search news articles..."
                                className="pl-10 w-full py-2 bg-slate-800/40 border border-slate-700/50 text-white rounded-md focus:ring-teal-500/50 focus:border-teal-500/50 placeholder-slate-400"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white py-2 px-6 rounded-md transition duration-300"
                        >
                            Search
                        </button>
                    </form>
                    
                    <div className="mt-4">
                        <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faFilter} className="mr-2 text-teal-400" />
                            <span className="font-semibold text-white">Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => handleCategoryChange('')}
                                className={`px-3 py-1 rounded-full text-sm ${!category ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white' : 'bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50'}`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button 
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`px-3 py-1 rounded-full text-sm ${category === cat ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white' : 'bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-slate-300">
                        Showing {news.length} of {totalItems} results
                        {category && <span> in <span className="text-teal-400 font-semibold">{category}</span></span>}
                        {search && <span> matching <span className="text-teal-400 font-semibold">"{search}"</span></span>}
                    </p>
                </div>
                
                {/* News Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                    </div>
                ) : news.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <div key={item._id} className="backdrop-blur-sm bg-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/placeholder-news.jpg';
                                        }}
                                    />
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-teal-500 to-indigo-500 text-white px-2 py-1 text-xs">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2 line-clamp-2 text-white">{item.title}</h2>
                                    <p className="text-slate-300 mb-4 line-clamp-3">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm text-slate-400 mb-3">
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                            {format(new Date(item.createdAt), 'MMM d, yyyy')}
                                        </div>
                                        <div className="flex items-center">
                                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                                            {item.views} views
                                        </div>
                                    </div>
                                    <Link 
                                        href={`/news/${item._id}`}
                                        className="block w-full text-center bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white py-2 rounded transition duration-300"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 backdrop-blur-sm bg-slate-900/50 border border-slate-700/50 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-white">No news articles found</h3>
                        <p className="text-slate-300">Try adjusting your search or filter criteria</p>
                    </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="flex items-center space-x-1">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded-md ${page === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800/50'}`}
                            >
                                Previous
                            </button>
                            
                            {getPageNumbers().map((num, index) => (
                                <button
                                    key={index}
                                    onClick={() => typeof num === 'number' ? handlePageChange(num) : null}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                        num === page 
                                            ? 'bg-gradient-to-r from-teal-500 to-indigo-500 text-white' 
                                            : num === '...' 
                                                ? 'cursor-default text-slate-300' 
                                                : 'text-slate-300 hover:bg-slate-800/50'
                                    }`}
                                >
                                    {num}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className={`px-3 py-1 rounded-md ${page === totalPages ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800/50'}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default News;