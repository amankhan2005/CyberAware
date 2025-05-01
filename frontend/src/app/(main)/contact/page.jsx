 'use client';
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[#0f172a] flex items-center justify-center min-h-screen px-4">
      <div className="bg-[#0f172a] text-white shadow-lg rounded-2xl p-10 max-w-xl w-full border border-[#1e293b]">
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Contact <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CyberAware</span>
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Have questions or need assistance? Reach out to us!
        </p>

        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-gray-300 font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-gray-300 font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-1 text-gray-300 font-medium">
              Your Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Type your message here..."
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg text-white font-semibold shadow"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
