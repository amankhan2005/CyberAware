'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ExpertLoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const expert = sessionStorage.getItem('expert');
    if (expert) {
      router.push('/expert/dashboard');
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});
      
      try {
        // Log the request
        console.log(`Sending login request to ${API_BASE_URL}/expert/login`, {
          email: formData.email,
          password: formData.password
        });
        
        // Make API call to authenticate the expert
        const response = await axios.post(`${API_BASE_URL}/expert/login`, {
          email: formData.email,
          password: formData.password
        });

        console.log('Login response:', response);

        if (response.status === 200 && response.data) {
          // Save expert data to session storage
          console.log('Login successful, expert data:', response.data);
          sessionStorage.setItem('expert', JSON.stringify(response.data));
          
          // Show success message
          toast.success('Login successful!');
          
          // Redirect to dashboard
          router.push('/expert/dashboard');
        } else {
          toast.error('Login failed. Please check your credentials.');
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Login error details:', error);
        
        if (error.response) {
          // If the server responded with an error message
          console.error('Server error response:', error.response.data);
          toast.error(error.response.data?.message || 'Authentication failed');
          
          if (error.response.status === 401) {
            setErrors({ 
              auth: 'Invalid email or password' 
            });
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
          toast.error('Server not responding. Please try again later.');
        } else {
          // Error setting up the request
          console.error('Request setup error:', error.message);
          toast.error('Network error. Please try again later.');
        }
        
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // For testing/debugging only
  const quickLogin = () => {
    // Use test credentials
    setFormData({
      email: 'expert@test.com',
      password: 'password123'
    });
    
    // You can call handleSubmit here if you want auto-submit
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 to-black text-white">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Expert Login
            </span>
          </h1>
          <p className="text-slate-300 max-w-md mx-auto">
            Sign in to access your expert dashboard, manage your contributions, and share your cybersecurity knowledge.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-slate-900/50 rounded-xl border border-slate-700/50 p-6 md:p-8 w-full max-w-md">
          {errors.auth && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{errors.auth}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-slate-800/40 border ${errors.email ? 'border-red-500' : 'border-slate-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-slate-500`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <Link href="/expert/forgot-password" className="text-sm text-teal-400 hover:text-teal-300">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-slate-800/40 border ${errors.password ? 'border-red-500' : 'border-slate-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-slate-500`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-teal-500 focus:ring-teal-400 rounded bg-slate-800 border-slate-600"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-300">
                Remember me
              </label>
            </div>

            {/* Dev-only feature, remove in production */}
            <div className="text-center">
              <button 
                type="button" 
                onClick={quickLogin}
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Use test account
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Create Account Link */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an expert account?{' '}
            <Link href="/expert-signup" className="text-teal-400 hover:text-teal-300">
              Create one here
            </Link>
          </p>
        </div>

        {/* Regular User Login Link */}
        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">
            Regular user?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpertLoginPage;
