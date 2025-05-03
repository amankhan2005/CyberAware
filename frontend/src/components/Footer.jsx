import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 to-indigo-950 text-white overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Glass morphism effect container */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 backdrop-blur-sm z-10">
        {/* Main content with grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Company Info - takes 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-3xl font-extrabold">
              <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                CyberAware
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Empowering individuals and organizations with cutting-edge   cybersecurity awareness and solutions.
            </p>
            
            {/* Social Links moved to company section */}
            <div className="flex space-x-4 pt-2">
              {[
                {
                  name: 'X',
                  path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
                },
                {
                  name: 'LinkedIn',
                  path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z'
                },
                {
                  name: 'GitHub',
                  path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z'
                }
              ].map((social) => (
                <a
                  key={social.name}
                  href={`#${social.name.toLowerCase()}`}
                  className="group relative rounded-full p-2 bg-slate-800/40 border border-slate-700/40 transition-all duration-300 hover:bg-indigo-800/30 hover:border-indigo-500/50 hover:-translate-y-1"
                  aria-label={social.name}
                >
                  <svg 
                    className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors duration-300" 
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - spans 2 columns */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-base font-semibold text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
            </h4>
            <ul className="space-y-2">
              {['About', 'Contact', 'Login', 'Sign Up'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="inline-block w-0 group-hover:w-2 h-[1px] bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Questions section - replaces the Newsletter section */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base font-semibold text-white relative inline-block">
              Frequently Asked Questions
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
            </h4>
            <div className="space-y-3">
              <a href="/faq#basics" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>How can I protect myself from phishing?</span>
              </a>
              <a href="/faq#password" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <span>What makes a strong password?</span>
              </a>
              <a href="/faq#reporting" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <span>How do I report a cybersecurity incident?</span>
              </a>
            </div>
          </div>

          {/* Resources Section - filling the rightmost space */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base font-semibold text-white relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
            </h4>
            <div className="space-y-3">
              <a href="/resources/tools" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>Security Tools</span>
              </a>
              <a href="/resources/guides" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                <span>Security Guides</span>
              </a>
              <a href="/resources/blog" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </span>
                <span>Blog & Articles</span>
              </a>
              <a href="/resources/videos" className="flex items-start space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 mt-0.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </span>
                <span>Video Tutorials</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/70">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xs text-slate-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} CyberAware. All rights reserved.
            </div>
            <div className="flex space-x-5 text-xs text-slate-400">
              <a href="#privacy" className="hover:text-teal-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#terms" className="hover:text-teal-400 transition-colors duration-300">Terms of Service</a>
              <a href="#cookies" className="hover:text-teal-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;