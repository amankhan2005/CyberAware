'use client'
import { useEffect, useState } from 'react';
import { Star, MessageCircle, Minus, Plus, MoreHorizontal, Search } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.expertId?.firstName + ' ' + article.expertId?.lastName).toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/articles/getall');
        console.log('Fetched articles:', res.data);
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ArticleCard({ article }) {
  const authorName = article.expertId ? 
    `${article.expertId.firstName} ${article.expertId.lastName}` : 
    'Unknown Author';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/news/${article._id}`} className="flex flex-col md:flex-row">
        <div className="p-6 flex-1">
          <div className="flex items-center mb-4">
            <img 
              src={'/expert.jpg'} 
              alt={authorName} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="capitalize text-sm font-medium text-gray-700">{authorName}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{article.title}</h3>
          <p className="text-gray-600 mb-4 text-lg">{article.description}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              <div className="flex items-center">
                <span className="mr-1">{article.views || 0}</span>
                <span className="sr-only">views</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-1" />
                <span>{article.comments?.length || 0}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Star size={16} className="text-yellow-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Minus size={16} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-64 p-6 object-cover rounded-lg"
          />
        </div>
      </Link>
    </div>
  );
}