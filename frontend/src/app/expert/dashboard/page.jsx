<<<<<<< HEAD
 'use client';

import { useRouter } from 'next/navigation';

export default function ExpertDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/expert_login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Expert Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800">Tasks</h2>
            <p className="text-sm text-blue-700">You have 5 tasks pending review.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800">Analytics</h2>
            <p className="text-sm text-green-700">Your performance has improved by 12% this month.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => router.push('/expert/add_article')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Article
          </button>
          <button
            onClick={() => router.push('/expert/manage_article')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Article
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
=======
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faChartLine, 
  faUsers, 
  faUserShield, 
  faPen, 
  faQuestion, 
  faClipboardList,
  faBook,
  faEdit,
  faEye,
  faThumbsUp,
  faComments,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ExpertDashboard = () => {
  const router = useRouter();
  const [expertData, setExpertData] = useState(null);
  const [articles, setArticles] = useState([]);
  const [queries, setQueries] = useState([]);
  const [statistics, setStatistics] = useState({
    articlesCount: 0,
    totalViews: 0,
    totalLikes: 0,
    queriesAnswered: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  
  let decodedToken;
  useEffect(() => {
    // Check if expert is logged in
    const expert = localStorage.getItem('expert-token');
    decodedToken = jwtDecode(expert);
    
    if (!expert) {
      toast.error('Please login to access the dashboard');
      router.push('/expert_login');
      return;
    }
    
    setExpertData(expert);
    
    // Fetch expert's articles
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/articles/expert/${decodedToken._id}`);
        setArticles(res.data);
        
        // Calculate statistics
        if (res.data && res.data.length > 0) {
          const views = res.data.reduce((sum, article) => sum + (article.views || 0), 0);
          const likes = res.data.reduce((sum, article) => sum + (article.likes?.length || 0), 0);
          
          setStatistics(prev => ({
            ...prev,
            articlesCount: res.data.length,
            totalViews: views,
            totalLikes: likes
          }));
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        toast.error('Failed to load articles');
      }
    };
    
    // Fetch pending queries
    const fetchQueries = async () => {
      try {
        // Correct endpoint for expert's queries
        const res = await axios.get(`${API_BASE_URL}/queries/getall`, {
          params: { expertId: decodedToken._id },
        });
        setQueries(res.data.data || []);

        // Update statistics
        const answeredQueries = res.data.data?.filter(q => q.solution)?.length || 0;
        setStatistics(prev => ({
          ...prev,
          queriesAnswered: answeredQueries
        }));
      } catch (error) {
        console.error('Error fetching queries:', error);
        setQueries([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
    fetchQueries();
  }, [router]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
          <p className="text-indigo-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 to-black text-white">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        {/* Header with Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Expert Dashboard
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Welcome back, <span className="text-teal-400 font-semibold">{expertData?.firstName} {expertData?.lastName}</span>. 
            Manage your articles, respond to queries, and share your cybersecurity knowledge.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-800/50 mr-4">
                <FontAwesomeIcon icon={faFileAlt} className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-indigo-300 font-medium">Articles Published</p>
                <p className="text-2xl font-bold text-white">{statistics.articlesCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-800/50 mr-4">
                <FontAwesomeIcon icon={faEye} className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-indigo-300 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-white">{statistics.totalViews}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-800/50 mr-4">
                <FontAwesomeIcon icon={faThumbsUp} className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-indigo-300 font-medium">Total Likes</p>
                <p className="text-2xl font-bold text-white">{statistics.totalLikes}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6 shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-800/50 mr-4">
                <FontAwesomeIcon icon={faQuestion} className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-indigo-300 font-medium">Queries Answered</p>
                <p className="text-2xl font-bold text-white">{statistics.queriesAnswered}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6 relative inline-block">
            Quick Actions
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500"></span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/expert/add_article" className="group">
              <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-indigo-800/40 hover:border-teal-500/50 group-hover:shadow-teal-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 mr-4 group-hover:from-teal-400 group-hover:to-indigo-400 transition-all duration-300">
                    <FontAwesomeIcon icon={faPen} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Create New Article</h3>
                </div>
                <p className="text-indigo-300 text-sm">Share your cybersecurity knowledge and insights with the community.</p>
              </div>
            </Link>

            <Link href="/expert/manage_article" className="group">
              <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-indigo-800/40 hover:border-teal-500/50 group-hover:shadow-teal-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 mr-4 group-hover:from-teal-400 group-hover:to-indigo-400 transition-all duration-300">
                    <FontAwesomeIcon icon={faEdit} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Manage Articles</h3>
                </div>
                <p className="text-indigo-300 text-sm">Edit, update, or remove your published articles.</p>
              </div>
            </Link>

            <Link href="/expert/queries" className="group">
              <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-6 shadow-lg transition-all duration-300 hover:bg-indigo-800/40 hover:border-teal-500/50 group-hover:shadow-teal-500/20">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 mr-4 group-hover:from-teal-400 group-hover:to-indigo-400 transition-all duration-300">
                    <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">View Pending Queries</h3>
                </div>
                <p className="text-indigo-300 text-sm">Answer questions from users seeking cybersecurity advice.</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Articles Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-6 relative inline-block">
            Your Recent Articles
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500"></span>
          </h2>

          {articles.length === 0 ? (
            <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-8 text-center">
              <FontAwesomeIcon icon={faBook} className="h-12 w-12 text-indigo-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Articles Yet</h3>
              <p className="text-indigo-300 mb-6">You haven't published any articles yet. Share your expertise with the community!</p>
              <Link href="/expert/add_article" className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium">
                Create Your First Article
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {articles.slice(0, 4).map((article) => (
                <div key={article._id} className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl overflow-hidden shadow-lg">
                  {article.image && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-indigo-800/50 text-teal-300 text-xs px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-indigo-400 text-xs flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-indigo-300 text-sm mb-4 line-clamp-2">{article.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <span className="text-indigo-400 text-sm flex items-center">
                          <FontAwesomeIcon icon={faEye} className="mr-1" />
                          {article.views || 0}
                        </span>
                        <span className="text-indigo-400 text-sm flex items-center">
                          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" />
                          {article.likes?.length || 0}
                        </span>
                        <span className="text-indigo-400 text-sm flex items-center">
                          <FontAwesomeIcon icon={faComments} className="mr-1" />
                          {article.comments?.length || 0}
                        </span>
                      </div>
                      <Link
                        href={`/expert/edit_article/${article._id}`}
                        className="text-teal-400 hover:text-teal-300 text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {articles.length > 4 && (
            <div className="mt-6 text-center">
              <Link href="/expert/manage_article" className="inline-block px-6 py-3 bg-indigo-900/50 border border-indigo-700/40 text-teal-400 rounded-lg transition-all duration-300 hover:bg-indigo-800/50 hover:border-teal-500/30 text-sm font-medium">
                View All Articles
              </Link>
            </div>
          )}
        </div>

        {/* Pending Queries Section - Only show if there are any */}
        {queries.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-6 relative inline-block">
              Pending Queries
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-indigo-500"></span>
            </h2>

            <div className="bg-indigo-900/30 backdrop-blur-sm border border-indigo-800/30 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-indigo-950/50 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Query</th>
                      <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-800/30">
                    {queries.slice(0, 5).map((query) => (
                      <tr key={query._id} className="hover:bg-indigo-800/20">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-200">
                          {query.userId?.name || 'Anonymous'}
                        </td>
                        <td className="px-6 py-4 text-sm text-indigo-200 max-w-xs truncate">
                          {query.doubt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          {formatDate(query.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {query.solution ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Answered
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">
                          <Link 
                            href={`/expert/queries/${query._id}`}
                            className="text-teal-400 hover:text-teal-300"
                          >
                            {query.solution ? 'View Answer' : 'Answer Query'}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {queries.length > 5 && (
              <div className="mt-6 text-center">
                <Link href="/expert/queries" className="inline-block px-6 py-3 bg-indigo-900/50 border border-indigo-700/40 text-teal-400 rounded-lg transition-all duration-300 hover:bg-indigo-800/50 hover:border-teal-500/30 text-sm font-medium">
                  View All Queries
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDashboard;