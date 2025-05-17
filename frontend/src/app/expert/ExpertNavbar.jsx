'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ExpertNavbar = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path) => {
        return pathname === path;
    };

    const navItems = [
        { name: 'Dashboard', path: '/expert/dashboard', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )},
        { name: 'Add Article', path: '/expert/add_article', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
        )},
        { name: 'Manage Articles', path: '/expert/manage_article', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        )},
        { name: 'Queries', path: '/expert/queries', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        )}
    ];

    return (
        <nav className="bg-indigo-950/40 backdrop-blur-sm border-b border-indigo-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link href="/expert/dashboard" className="flex items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                CyberAware Expert
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(item.path)
                                            ? 'bg-indigo-900/50 text-teal-400'
                                            : 'text-slate-300 hover:text-teal-400 hover:bg-indigo-900/30'
                                    }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="relative ml-3">
                        <div>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center max-w-xs rounded-full bg-indigo-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 flex items-center justify-center">
                                    <span className="text-white font-medium">E</span>
                                </div>
                            </button>
                        </div>

                        {/* Dropdown Menu */}
                        {isUserMenuOpen && (
                            <div className="origin-top-right absolute z-[9999] right-0 mt-2 w-48 rounded-md shadow-lg bg-indigo-950/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    <Link
                                        href="/expert/profile"
                                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-900/50 hover:text-teal-400"
                                        role="menuitem"
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        href="/expert/settings"
                                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-indigo-900/50 hover:text-teal-400"
                                        role="menuitem"
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Add logout logic here
                                            console.log('Logout clicked');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-indigo-900/50"
                                        role="menuitem"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                isActive(item.path)
                                    ? 'bg-indigo-900/50 text-teal-400'
                                    : 'text-slate-300 hover:text-teal-400 hover:bg-indigo-900/30'
                            }`}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default ExpertNavbar;