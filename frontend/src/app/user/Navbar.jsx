'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/user/profile' },
  { name: 'Report Incident', path: '/user/report-incident' },
  { name: 'Queries', path: '/user/queries' }
];

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  return (
    <nav className="bg-indigo-950 backdrop-blur-sm border-b border-indigo-800/30 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/user/dashboard" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                CyberAware User
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-900/50 text-teal-400'
                    : 'text-slate-300 hover:text-teal-400 hover:bg-indigo-900/30'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative ml-3">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center max-w-xs rounded-full bg-indigo-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-medium">U</span>
              </div>
            </button>
            {isUserMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-indigo-950/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <Link
                    href="/user/profile"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-900/50 hover:text-teal-400"
                    role="menuitem"
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {/* Add logout logic here */}}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-indigo-900/50"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:bg-indigo-800/30 hover:border-indigo-500/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'bg-indigo-900/50 text-teal-400'
                  : 'text-slate-300 hover:text-teal-400 hover:bg-indigo-900/30'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;