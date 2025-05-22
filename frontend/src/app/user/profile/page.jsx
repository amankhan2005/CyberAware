'use client';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jwt_decode from '@/utils/jwt_decode';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faCalendarAlt, 
  faArrowLeft, 
  faMapMarkerAlt, 
  faShieldAlt, 
  faIdBadge,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';
import { getProfileCache, setProfileCache } from '@/utils/profileCache';
import './profile.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [securityTabLoaded, setSecurityTabLoaded] = useState(false);  
  
  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    
    const fetchUserData = async () => {
      // Each request gets its own abort controller
      const controller = new AbortController();
      
      try {
        // Try to get data from cache first for instant loading
        const cachedData = getProfileCache();
        if (cachedData && isMounted) {
          setUserData(cachedData);
          setLoading(false);
          // Still fetch fresh data in the background
        }
        
        // Check for token
        const token = localStorage.getItem('token');
        if (!token) {
          if (isMounted) {
            setError('No user token found. Please login.');
            setLoading(false);
          }
          return;
        }
        
        // Set a fail-safe timeout
        timeoutId = setTimeout(() => {
          controller.abort();
        }, 5000);
        
        try {
          // Decode the token
          const decoded = jwt_decode(token);
          const userId = decoded._id || decoded.id;
          
          if (!userId) {
            if (isMounted) {
              setError('Invalid token.');
              setLoading(false);
            }
            return;
          }
          
          // Make the API request without setting up abort event listeners
          // This avoids the onCanceled error
          const res = await axios.get(`${API_URL}/users/getbyid/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
            timeout: 5000
          });
          
          // Handle successful response
          if (isMounted && res.data) {
            setProfileCache(res.data);
            setUserData(res.data);
          }
        } catch (error) {
          // Don't log or handle errors if component unmounted or request canceled
          if (!isMounted || axios.isCancel(error)) {
            return;
          }
          
          console.error('Profile data fetch error:', error);
          
          if (isMounted) {
            if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
              setError('Request timed out. Please check your connection and try again.');
            } else if (error.response && error.response.status === 401) {
              setError('Your session has expired. Please login again.');
            } else {
              setError('Failed to load profile data. Please try again later.');
            }
          }
        }
      } catch (err) {
        // Only set error state if component is still mounted
        if (isMounted) {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        // Clear timeout to prevent memory leaks
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        // Only update loading state if component is still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchUserData();
    
    // Cleanup function - runs when component unmounts
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  };
  }, []);

  // Memoize the date formatting function to improve performance
  const formatDate = useMemo(() => {
    return (dateString) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      } catch (e) {
        console.error('Date formatting error:', e);
        return 'Invalid date';
      }
    };
  }, []);
  
  // Loading state handling
  if (loading) return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-teal-400 text-xl font-semibold">Loading profile...</div>
      </div>
    </div>
  );
  
  // Error state handling
  if (error) return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
      <div className="max-w-md mx-auto text-red-400 bg-indigo-900/50 border border-red-500/30 p-6 rounded-lg">
        <p className="text-center">{error}</p>
        <Link href="/login" className="mt-4 block text-center text-teal-400 hover:text-teal-300">Go to Login</Link>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white relative pt-6">
      {/* Simplified pattern overlay with reduced opacity */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-pattern"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-12 z-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              User Profile
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            View and manage your personal information and security settings
          </p>
        </div>

        {userData ? (
          <div className="space-y-8">
            {/* Main Profile Card */}
            <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl overflow-hidden">              <div className="bg-indigo-900/90 p-6 relative">                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {userData.name ? userData.name[0].toUpperCase() : '?'}
                      </span>
                    </div>
                  </div><div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {userData.name}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                      {userData.role && (
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium border border-teal-500/30">
                          <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
                          {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-indigo-200">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      {userData.email}
                    </p>
                    {userData.createdAt && (
                      <p className="text-indigo-300 text-sm mt-2">
                        Member since {formatDate(userData.createdAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
                {/* Simplified Tab Navigation */}
              <div className="flex border-b border-indigo-800/50">
                <button 
                  onClick={() => setActiveTab('personal')} 
                  className={`flex-1 py-3 px-3 text-center font-medium ${
                    activeTab === 'personal' 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-indigo-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faIdBadge} className="mr-1" />
                  Personal Info
                </button>                <button 
                  onClick={() => {
                    setActiveTab('security');
                    setSecurityTabLoaded(true);
                  }} 
                  className={`flex-1 py-3 px-3 text-center font-medium ${
                    activeTab === 'security' 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-indigo-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faUserCog} className="mr-1" />
                  Security
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                      <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/40">
                        <div className="flex items-start">
                          <div className="bg-teal-500/20 p-2 rounded-lg mr-4">
                            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-teal-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-indigo-300 text-sm font-medium mb-1">Full Name</p>
                            <p className="text-white">{userData.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/40">
                        <div className="flex items-start">
                          <div className="bg-teal-500/20 p-2 rounded-lg mr-4">
                            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-teal-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-indigo-300 text-sm font-medium mb-1">Email Address</p>
                            <p className="text-white">{userData.email}</p>
                          </div>
                        </div>
                      </div>                      {userData.city && userData.city !== 'No City' && (
                        <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/40">
                          <div className="flex items-start">
                            <div className="bg-teal-500/20 p-2 rounded-lg mr-4">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-teal-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-indigo-300 text-sm font-medium mb-1">Location</p>
                              <p className="text-white">{userData.city}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userData.createdAt && (
                        <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/40">
                          <div className="flex items-start">
                            <div className="bg-teal-500/20 p-2 rounded-lg mr-4">
                              <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-teal-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-indigo-300 text-sm font-medium mb-1">Member Since</p>
                              <p className="text-white">{formatDate(userData.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-center md:justify-end">
                      <button className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}                {activeTab === 'security' && securityTabLoaded && (
                  <div className="space-y-4">
                    <div className="bg-indigo-900/30 rounded-lg p-4 border border-indigo-700/40">
                      <h3 className="text-lg font-medium text-white mb-3">Security Settings</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-indigo-800/30">
                          <div>
                            <p className="font-medium text-white">Change Password</p>
                            <p className="text-sm text-indigo-300">Update your password regularly</p>
                          </div>
                          <button className="px-3 py-1.5 bg-indigo-700/50 rounded text-white text-sm">
                            Update
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b border-indigo-800/30">
                          <div>
                            <p className="font-medium text-white">Two-Factor Authentication</p>
                            <p className="text-sm text-indigo-300">Add an extra layer of security</p>
                          </div>
                          <button className="px-3 py-1.5 bg-indigo-700/50 rounded text-white text-sm">
                            Enable
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center py-2">
                          <div>
                            <p className="font-medium text-white">Connected Devices</p>
                            <p className="text-sm text-indigo-300">Manage your active sessions</p>
                          </div>
                          <button className="px-3 py-1.5 bg-indigo-700/50 rounded text-white text-sm">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'security' && !securityTabLoaded && (
                  <div className="p-4 text-center text-indigo-300">
                    Loading security settings...
                  </div>
                )}
              </div>
            </div>
              {/* Simplified Recent Activity Section */}
            <div className="bg-indigo-900/30 rounded-lg border border-indigo-700/40 p-4">
              <h3 className="text-lg font-bold text-teal-400 mb-3">
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-teal-400 text-xs" />
                  </div>
                  <div>
                    <p className="text-white">Security scan completed</p>
                    <p className="text-xs text-indigo-300">Today</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faUser} className="text-indigo-400 text-xs" />
                  </div>
                  <div>
                    <p className="text-white">Profile updated</p>
                    <p className="text-xs text-indigo-300">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl p-8 text-center">
            <p className="text-slate-300">No user data available</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/user/dashboard" className="text-teal-400 hover:text-teal-300 text-sm flex items-center justify-center">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;