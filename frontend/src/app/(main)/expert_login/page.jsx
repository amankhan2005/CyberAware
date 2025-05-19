'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ExpertLoginPage = () => {
  const router = useRouter();
 

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',

    },
    onSubmit: (values) => {
      axios.post(`${API_BASE_URL}/experts/login`, values)
        .then((response) => {
          toast.success('Login Successful');
          console.log(response.data);
          localStorage.setItem('expert-token', response.data.token);
          // localStorage.setItem('user', JSON.stringify(response.data.user));
          router.push('/expert/dashboard');
        })
        .catch((error) => {
          toast.error('Login Failed: ' + error.response.data.message || 'Invalid credentials');
        });
    }
  });
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
          <form onSubmit={loginForm.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-slate-800/40 border focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-slate-500`}
                placeholder="you@example.com"
              />
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
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                className={`w-full px-4 py-2.5 rounded-lg bg-slate-800/40 border focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-slate-500`}
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-medium rounded-lg hover:from-teal-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300"
            >
              Sign In
            </button>

            <p className="text-slate-400 text-sm text-center">
              Don't have an expert account?{' '}
              <Link href="/expert-signup" className="text-teal-400 hover:text-teal-300">
                Create one here
              </Link>
            </p>
          </form>
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
