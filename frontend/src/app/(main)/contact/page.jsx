'use client';
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-950 to-black flex items-center justify-center min-h-screen px-4">
      <div className="bg-gradient-to-br from-indigo-800/80 to-indigo-900/80 text-white shadow-lg rounded-2xl p-10 max-w-xl w-full border border-indigo-700/40">
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Contact <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200 bg-clip-text text-transparent">CyberAware</span>
        </h1>
        <p className="text-center text-indigo-200 mb-6">
          Have questions or need assistance? Reach out to us!
        </p>

        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-indigo-200 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-indigo-200 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-1 text-indigo-200 font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Type your message here..."
              required
              className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 text-white border border-indigo-700/40 focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 transition-all duration-300 px-4 py-2 rounded-lg text-white font-semibold shadow"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
