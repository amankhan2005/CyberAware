'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faEye,
  faThumbsUp,
  faQuestion,
  faPen,
  faEdit,
  faClipboardList,
  faBook,
  faCalendarAlt,
  faComments,
  faExclamationTriangle,
  faFlag
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
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [solution, setSolution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  // Format date helper function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper functions for status and priority colors
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  }; useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('expert-token');
        if (!token) {
          router.push('/expert_login');
          return;
        }

        let expertId;
        // Decode token and check if it's valid
        try {
          const decodedToken = jwtDecode(token);

          // Check if token is expired
          if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            console.error('Expert token has expired');
            localStorage.removeItem('expert-token');
            router.push('/expert_login');
            return;
          }

          setExpertData(decodedToken);
          expertId = decodedToken._id;
        } catch (tokenError) {
          console.error('Error decoding token:', tokenError);
          localStorage.removeItem('expert-token');
          router.push('/expert_login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };        // Fetch expert's articles
        const articlesRes = await axios.get(`${API_BASE_URL}/articles/expert/${expertId}`, config);
        setArticles(articlesRes.data || []);

        // Fetch pending queries
        const queriesRes = await axios.get(`${API_BASE_URL}/queries/expert/${expertId}`, config);
        // The API returns { success: true, data: [...] } structure
        const queriesData = queriesRes.data?.data || [];
        setQueries(queriesData);

        // Calculate statistics
        const stats = {
          articlesCount: articlesRes.data?.length || 0,
          totalViews: articlesRes.data?.reduce((sum, article) => sum + (article.views || 0), 0) || 0,
          totalLikes: articlesRes.data?.reduce((sum, article) => sum + (article.likes?.length || 0), 0) || 0,
          queriesAnswered: queriesData.filter(query => query.solution)?.length || 0
        };
        setStatistics(stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Only show error toast if there was an actual API error
        if (error.response) {
          toast.error('Failed to load dashboard data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Function to handle query submission
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!solution.trim()) {
      toast.error('Please provide a solution');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('expert-token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.post(`${API_BASE_URL}/queries/respond/${selectedQuery._id}`,
        { message: solution.trim() }, // The backend expects 'message', not 'solution'
        config
      );

      // Update queries list
      setQueries(queries.map(q =>
        q._id === selectedQuery._id
          ? { ...q, solution: solution.trim() }
          : q
      ));

      // Update statistics
      setStatistics(prev => ({
        ...prev,
        queriesAnswered: prev.queriesAnswered + 1
      }));

      toast.success('Query answered successfully');
      setSelectedQuery(null);
      setSolution('');
    } catch (error) {
      console.error('Error answering query:', error);
      toast.error('Failed to submit answer');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Functions to handle status and priority changes
  const handleStatusChange = async (queryId, newStatus) => {
    try {
      const token = localStorage.getItem('expert-token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.patch(`${API_BASE_URL}/queries/${queryId}/status`,
        { status: newStatus },
        config
      );

      setQueries(queries.map(q =>
        q._id === queryId
          ? { ...q, status: newStatus }
          : q
      ));

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handlePriorityChange = async (queryId, newPriority) => {
    try {
      const token = localStorage.getItem('expert-token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.patch(`${API_BASE_URL}/queries/${queryId}/priority`,
        { priority: newPriority },
        config
      );

      setQueries(queries.map(q =>
        q._id === queryId
          ? { ...q, priority: newPriority }
          : q
      ));

      toast.success('Priority updated successfully');
    } catch (error) {
      console.error('Error updating priority:', error);
      toast.error('Failed to update priority');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-950 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 to-black text-white">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 0V4h-2V0h-4v2h4v4h2V2h4V0h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 0V4H4V0H0v2h4v4h2V2h4V0H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
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
                <table className="w-full table-auto">                  <thead>
                  <tr className="bg-indigo-950/50 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Query</th>
                    <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-xs font-medium text-indigo-300 uppercase tracking-wider">Priority</th>
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
                        </td>                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={query.priority || 'medium'}
                            onChange={(e) => handlePriorityChange(query._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(query.priority || 'medium')} cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={query.status || 'pending'}
                            onChange={(e) => handleStatusChange(query._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(query.status || 'pending')} cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-300">{query.solution ? (
                          <Link
                            href={`/expert/queries/${query._id}`}
                            className="text-teal-400 hover:text-teal-300"
                          >
                            View Answer
                          </Link>
                        ) : (
                          <button
                            onClick={() => setSelectedQuery(query)}
                            className="text-teal-400 hover:text-teal-300"
                          >
                            Answer Query
                          </button>
                        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Answer Query Modal */}
              {selectedQuery && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-indigo-900/95 backdrop-blur-sm border border-indigo-800/30 rounded-xl p-6 w-full max-w-2xl">
                    <h3 className="text-xl font-bold text-white mb-4">Answer Query</h3>
                    <div className="mb-4">
                      <p className="text-indigo-300 mb-2">User's Query:</p>
                      <p className="text-white bg-indigo-950/50 p-4 rounded-lg">{selectedQuery.doubt}</p>
                    </div>
                    <form onSubmit={handleQuerySubmit}>
                      <div className="mb-4">
                        <label className="block text-indigo-300 mb-2">Your Solution:</label>
                        <textarea
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          className="w-full bg-indigo-950/50 border border-indigo-800/30 rounded-lg p-4 text-white min-h-[150px]"
                          placeholder="Type your solution here..."
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedQuery(null);
                            setSolution('');
                          }}
                          className="px-4 py-2 bg-indigo-800/50 text-white rounded-lg hover:bg-indigo-700/50 transition-colors"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg hover:from-teal-400 hover:to-indigo-400 transition-colors"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
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
}

export default ExpertDashboard;