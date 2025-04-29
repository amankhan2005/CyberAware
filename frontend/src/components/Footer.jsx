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
                  name: 'Twitter',
                  path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83A7.72 7.72 0 0023 3z'
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

          {/* Contact Info - spans 3 columns */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base font-semibold text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
            </h4>
            <div className="space-y-3">
              <a href="mailto:contact@cyberaware.com" className="flex items-center space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span>contact@cyberaware.com</span>
              </a>
              <a href="tel:+15551234567" className="flex items-center space-x-3 text-sm text-slate-300 hover:text-white transition-colors duration-300 group">
                <span className="p-1.5 rounded-full bg-slate-800/40 border border-slate-700/40 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>

          {/* Newsletter - spans 3 columns */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base font-semibold text-white relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-teal-400"></span>
            </h4>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-sm text-white placeholder-slate-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                <span className="relative">Subscribe</span>
              </button>
            </form>
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