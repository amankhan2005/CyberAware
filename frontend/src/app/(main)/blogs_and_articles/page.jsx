'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCalendar, faUser, faChevronDown, faChevronUp, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';

const BlogsAndArticles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedArticles, setExpandedArticles] = useState({});
  const [articles, setArticles] = useState([]);
  const [expertNames, setExpertNames] = useState({});

  // Toggle article expansion
  const toggleArticle = (id) => {
    setExpandedArticles({
      ...expandedArticles,
      [id]: !expandedArticles[id],
    });
  };

  // Fetch all articles
  const fetchArticles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/articles/getall');
      if (res.status === 200) {
        setArticles(res.data);
        toast.success('Articles fetched successfully!');
      } else {
        toast.error('Failed to fetch articles!');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to fetch articles!');
    }
  };

  // Fetch expert name by ID and cache it
  const fetchExpertName = async (expertId) => {
    if (!expertId) return 'Unknown Expert';
    if (expertNames[expertId]) return expertNames[expertId];
    try {
      const res = await axios.get(`http://localhost:5000/experts/getbyid/${expertId}`);
      if (res.status === 200) {
        const name = res.data.firstName || 'Unknown Expert';
        setExpertNames((prev) => ({ ...prev, [expertId]: name }));
        return name;
      } else {
        return 'Unknown Expert';
      }
    } catch {
      return 'Unknown Expert';
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Fetch expert names for all articles after articles are loaded
  useEffect(() => {
    const fetchAllExpertNames = async () => {
      const ids = Array.from(new Set(articles.map((a) => a.expertId).filter(Boolean)));
      await Promise.all(ids.map((id) => fetchExpertName(id)));
    };
    if (articles.length > 0) fetchAllExpertNames();
    // eslint-disable-next-line
  }, [articles]);

  // Filter articles based on search query and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-teal-600 text-white py-16 px-6">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative">
            <span className="relative inline-block">
              <span className="absolute inset-0 transform translate-x-1 translate-y-1 bg-black/30 blur-sm"></span>
              <span className="relative z-10 bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
                Blogs & Articles
              </span>
            </span>
          </h1>
          <p className="text-xl max-w-3xl text-white">
            Stay informed with our latest articles, insights, and expert opinions on cybersecurity topics.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-indigo-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-6 border border-indigo-700/40 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-indigo-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles by title, topic, or keyword"
                  className="block w-full pl-10 pr-3 py-3 bg-indigo-950/50 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter and Create New Article */}
            <div className="flex space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faFilter} className="text-indigo-300" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 bg-indigo-950/50 border border-indigo-700/40 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Filter by Category</option>
                    <option value="Threat Analysis">Threat Analysis</option>
                    <option value="Legislation">Legislation</option>
                    <option value="Business Security">Business Security</option>
                    <option value="Personal Security">Personal Security</option>
                    <option value="Critical Infrastructure">Critical Infrastructure</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FontAwesomeIcon icon={faChevronDown} className="text-indigo-300" />
                  </div>
                </div>
              </div>

              {/* Create New Article Button */}
              {/* <Link href="/expert/add_article" className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 font-medium shadow-lg hover:shadow-teal-500/20">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                <span>Write Article</span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {filteredArticles.length === 0 ? (
            <div className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl text-center">
              <p className="text-white text-xl">No articles found matching your search criteria.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-indigo-400 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div key={article._id} className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl">
                <div className="flex flex-col space-y-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={article.image} alt="" className="w-18" />
                      <span className="bg-indigo-900/30 text-teal-300 text-xs font-medium px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <div className="flex items-center text-indigo-300 text-sm">
                        <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                        {new Date(article.createdAt).toLocaleDateString('en-IN', {})}
                      </div>
                      <div className="flex items-center text-indigo-300 text-sm">
                        <FontAwesomeIcon icon={faUser} className="mr-1" />
                        <span>
                          {expertNames[article.expertId] || <span className="text-indigo-400">Loading...</span>}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{article.title}</h2>
                    <p className="text-indigo-200 mb-4">{article.summary}</p>

                    <button
                      onClick={() => toggleArticle(article._id)}
                      className="text-teal-400 hover:text-teal-300 font-medium flex items-center"
                    >
                      {expandedArticles[article._id] ? 'Read Less' : 'Read More'}
                      <FontAwesomeIcon
                        icon={expandedArticles[article._id] ? faChevronUp : faChevronDown}
                        className="ml-2"
                      />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedArticles[article._id] && (
                    <div className="mt-6 border-t border-indigo-700/40 pt-6 text-white">
                      <p>{article.content}</p>
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() => toggleArticle(article._id)}
                          className="px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-indigo-400 transition-all duration-300"
                        >
                          Close Article
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsAndArticles;
