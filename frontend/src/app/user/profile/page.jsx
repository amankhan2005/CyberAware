'use client';
import React, { useEffect, useState } from 'react';
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
  faClock,
  faIdBadge,
  faCheckCircle,
  faUserCog
} from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No user token found. Please login.');
          setLoading(false);
          return;
        }
        const decoded = jwt_decode(token);
        const userId = decoded._id || decoded.id;
        if (!userId) {
          setError('Invalid token.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${API_URL}/users/getbyid/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        setError('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black flex items-center justify-center">
      <div className="text-red-400 bg-indigo-950/50 backdrop-blur-sm border border-red-500/30 p-6 rounded-lg shadow-lg">
        <p className="text-center">{error}</p>
        <Link href="/login" className="mt-4 block text-center text-teal-400 hover:text-teal-300">Go to Login</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white relative pt-6">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

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
            <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-900/70 to-purple-900/70 p-6 relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.12\'%3E%3Cpath opacity=\'.5\' d=\'M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 p-1 shadow-lg shadow-indigo-500/30">
                      <div className="w-full h-full rounded-full bg-indigo-950 flex items-center justify-center">
                        <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                          {userData.name ? userData.name[0].toUpperCase() : '?'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {userData.name}
                    </h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                      {userData.role && (
                        <span className="px-3 py-1 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 backdrop-blur-sm text-teal-300 rounded-full text-sm font-medium border border-teal-500/30">
                          <FontAwesomeIcon icon={faShieldAlt} className="mr-1" />
                          {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-indigo-500/20 backdrop-blur-sm text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                        Verified Account
                      </span>
                    </div>
                    <p className="text-indigo-200">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      {userData.email}
                    </p>
                    {userData.createdAt && (
                      <p className="text-indigo-300 text-sm mt-2">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        Member since {new Date(userData.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex border-b border-indigo-800/50">
                <button 
                  onClick={() => setActiveTab('personal')} 
                  className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                    activeTab === 'personal' 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-indigo-300 hover:text-teal-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faIdBadge} className="mr-2" />
                  Personal Info
                </button>
                <button 
                  onClick={() => setActiveTab('security')} 
                  className={`flex-1 py-4 px-4 text-center font-medium transition-colors ${
                    activeTab === 'security' 
                      ? 'text-teal-400 border-b-2 border-teal-400' 
                      : 'text-indigo-300 hover:text-teal-300'
                  }`}
                >
                  <FontAwesomeIcon icon={faUserCog} className="mr-2" />
                  Security
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-indigo-900/20 rounded-xl backdrop-blur-sm p-5 border border-indigo-700/40 transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/10">
                        <div className="flex items-start">
                          <div className="bg-gradient-to-r from-teal-500/30 to-indigo-500/30 p-2 rounded-lg mr-4">
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-teal-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-indigo-300 text-sm font-medium mb-1">Full Name</p>
                            <p className="text-white text-lg font-medium">{userData.name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-900/20 rounded-xl backdrop-blur-sm p-5 border border-indigo-700/40 transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/10">
                        <div className="flex items-start">
                          <div className="bg-gradient-to-r from-teal-500/30 to-indigo-500/30 p-2 rounded-lg mr-4">
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-teal-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-indigo-300 text-sm font-medium mb-1">Email Address</p>
                            <p className="text-white text-lg font-medium">{userData.email}</p>
                          </div>
                        </div>
                      </div>

                      {userData.city && userData.city !== 'No City' && (
                        <div className="bg-indigo-900/20 rounded-xl backdrop-blur-sm p-5 border border-indigo-700/40 transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/10">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-r from-teal-500/30 to-indigo-500/30 p-2 rounded-lg mr-4">
                              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 text-teal-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-indigo-300 text-sm font-medium mb-1">Location</p>
                              <p className="text-white text-lg font-medium">{userData.city}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {userData.createdAt && (
                        <div className="bg-indigo-900/20 rounded-xl backdrop-blur-sm p-5 border border-indigo-700/40 transition-all hover:border-teal-500/40 hover:shadow-md hover:shadow-teal-500/10">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-r from-teal-500/30 to-indigo-500/30 p-2 rounded-lg mr-4">
                              <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5 text-teal-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-indigo-300 text-sm font-medium mb-1">Member Since</p>
                              <p className="text-white text-lg font-medium">
                                {new Date(userData.createdAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
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
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-indigo-900/20 rounded-xl backdrop-blur-sm p-5 border border-indigo-700/40">
                      <h3 className="text-lg font-medium text-white mb-4">Security Settings</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-indigo-800/30">
                          <div>
                            <p className="font-medium text-white">Change Password</p>
                            <p className="text-sm text-indigo-300">Update your password regularly</p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-700/50 hover:bg-indigo-700/70 rounded-lg text-white text-sm transition-colors">
                            Update
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-indigo-800/30">
                          <div>
                            <p className="font-medium text-white">Two-Factor Authentication</p>
                            <p className="text-sm text-indigo-300">Add an extra layer of security</p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-700/50 hover:bg-indigo-700/70 rounded-lg text-white text-sm transition-colors">
                            Enable
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center py-3">
                          <div>
                            <p className="font-medium text-white">Connected Devices</p>
                            <p className="text-sm text-indigo-300">Manage your active sessions</p>
                          </div>
                          <button className="px-4 py-2 bg-indigo-700/50 hover:bg-indigo-700/70 rounded-lg text-white text-sm transition-colors">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
                  Recent Activity
                </span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-teal-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white">Security scan completed</p>
                    <p className="text-sm text-indigo-300">Your account passed all security checks</p>
                    <p className="text-xs text-indigo-400 mt-1">Today</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faUser} className="text-indigo-400 text-sm" />
                  </div>
                  <div>
                    <p className="text-white">Profile updated</p>
                    <p className="text-sm text-indigo-300">You updated your profile information</p>
                    <p className="text-xs text-indigo-400 mt-1">2 days ago</p>
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