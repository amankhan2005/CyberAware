'use client';
import ExpertNavbar from './ExpertNavbar';
import { useProtectedRoute } from '../../utils/auth';
import { useRouter } from 'next/navigation';

export default function ExpertLayout({ children }) {
    const router = useRouter();
    // Protect this route for expert users only
    const { loading } = useProtectedRoute('expert', '/expert_login');

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            <p className="ml-2 text-lg text-teal-400">Loading...</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white">
            <ExpertNavbar />
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}