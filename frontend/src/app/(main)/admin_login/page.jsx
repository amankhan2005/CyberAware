'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const AdminLoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Check if user is already logged in as admin
  useEffect(() => {
    const token = localStorage.getItem('admin-token') || localStorage.getItem('token');
    
    if (token) {
      try {
        // If using jwt-decode library:
        const { exp, role } = JSON.parse(atob(token.split('.')[1]));
        
        // Check if token is valid and user is admin
        if (exp * 1000 > Date.now() && role === 'admin') {
          toast.success('Already logged in as admin');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem('admin-token');
        localStorage.removeItem('token');
      }
    }
  }, []);
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
        // Call the API to authenticate the admin
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      fetch(`${API_URL}/users/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      .then(response => response.json())
      .then(data => {
        setIsSubmitting(false);
          if (data.token && data.user) {
          // Check if the user is an admin
          if (data.user.role === 'admin') {
            // Store the token in localStorage
            localStorage.setItem('admin-token', data.token);
            localStorage.setItem('token', data.token);
            
            // Store basic user info
            localStorage.setItem('admin-user', JSON.stringify({
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role
            }));
            
            // Show success message
            toast.success('Login successful');
            
            // Redirect to admin dashboard
            router.push('/admin/dashboard');
          } else {
            setErrors({ auth: 'Access denied. Admin privileges required.' });
          }
        } else {
          setErrors({ auth: data.message || 'Login failed. Please check your credentials.' });
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        setIsSubmitting(false);
        setErrors({ auth: 'An error occurred during login. Please try again.' });
      });
    } else {
      setErrors(validationErrors);
    }
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
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">
              Admin Login
            </span>
          </h1>
          <p className="text-white max-w-md mx-auto">
            Sign in to access your admin dashboard, manage platform content, and oversee cybersecurity operations.
          </p>
        </div>

        <div className="backdrop-blur-sm bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 rounded-xl border border-indigo-700/40 p-6 md:p-8 w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.auth && (
              <div className="bg-red-900/50 border border-red-700 text-white px-4 py-3 rounded-lg" role="alert">
                <p>{errors.auth}</p>
              </div>
            )}
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.email ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
                placeholder="admin@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-1">
                  Password
                </label>
                <Link href="/admin/forgot-password" className="text-sm text-teal-400 hover:text-teal-300">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${errors.password ? 'border-red-500' : 'border-indigo-700/40'} focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-indigo-300`}
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
                className="h-4 w-4 text-teal-500 focus:ring-teal-400 rounded bg-indigo-950 border-indigo-700"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-indigo-200">
                Remember me
              </label>
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

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <p className="text-indigo-200 text-sm">
            This is a protected administrative area. Unauthorized access attempts are monitored and logged.
          </p>
        </div>

        {/* Regular User Login Link */}
        <div className="mt-4 text-center">
          <p className="text-indigo-200 text-sm">
            Not an admin?{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300">
              Return to main login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
