import Link from 'next/link';
import React from 'react'

const AskQuestion = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Link
                href="/user/queries"
                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:from-teal-400 hover:to-indigo-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                aria-label="Ask a Question"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Ask a Question
                </span>
            </Link>
        </div>
    )
}

export default AskQuestion;