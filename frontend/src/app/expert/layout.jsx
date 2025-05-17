'use client';
import ExpertNavbar from './ExpertNavbar';

export default function ExpertLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
            <ExpertNavbar />
            <main className="p-6">
                {children}
            </main>
        </div>
    );
} 