'use client';
import React from 'react';
import Link from 'next/link';

export default function ErrorBoundary({ error }) {
    return (
        <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
            <div className="bg-indigo-900/50 border border-red-500/30 rounded-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
                <p className="text-red-400 mb-4">
                    {error?.message || 'Failed to load profile data. Please try again.'}
                </p>
                <div className="flex flex-col space-y-3">
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-md text-white text-sm transition-colors"
                    >
                        Try again
                    </button>
                    <Link 
                        href="/user/dashboard" 
                        className="px-4 py-2 bg-transparent border border-indigo-500 hover:border-indigo-400 rounded-md text-indigo-300 hover:text-indigo-200 text-sm text-center transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
