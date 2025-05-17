'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar, faUser, faSearch } from "@fortawesome/free-solid-svg-icons"
import axios from 'axios';

export default function BrowseArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/articles/getall');
        setArticles(response.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                Browse Articles
              </span>
            </span>
          </h1>
          <p className="text-xl max-w-3xl text-white">
            Explore expert insights and comprehensive guides on cybersecurity topics.
          </p>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1">
          <svg className="w-full h-12 sm:h-16 fill-current text-indigo-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.77,70.92,127.07,62.3,171.36,65.1,275.68,71.65,252.55,78.26,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl p-6 border border-indigo-700/40 shadow-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-indigo-300" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title or content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 bg-indigo-950/50 border border-indigo-700/40 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
            </div>
          ) : error ? (
            <div className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl text-center">
              <p className="text-red-400 text-xl">{error}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl p-8 border border-indigo-700/40 shadow-xl text-center">
              <p className="text-white text-xl">No articles found matching your search.</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <Link href={`/news/${article._id}`} key={article._id}>
                <div className="bg-gradient-to-br from-indigo-800/70 to-indigo-900/70 rounded-xl border border-indigo-700/40 shadow-xl overflow-hidden hover:border-teal-500/50 transition-all duration-300">
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                    {article.image && (
                      <div className="md:w-64 h-48 md:h-auto relative">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-transparent rounded-lg"></div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center">
                          <img 
                            src={article.expertId?.profileImage || '/expert.jpg'} 
                            alt={`${article.expertId?.firstName} ${article.expertId?.lastName}`}
                            className="w-10 h-10 rounded-full border-2 border-indigo-700/40"
                          />
                          <span className="ml-3 text-teal-300 font-medium">
                            {article.expertId ? `${article.expertId.firstName} ${article.expertId.lastName}` : 'Unknown Author'}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{article.title}</h3>
                      <p className="text-indigo-200 mb-4">{article.description}</p>
                      
                      <div className="flex items-center text-indigo-300 text-sm space-x-4">
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">{article.views || 0} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}