 'use client';

import { useRouter } from 'next/navigation';

export default function ExpertDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/expert_login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Expert Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800">Tasks</h2>
            <p className="text-sm text-blue-700">You have 5 tasks pending review.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800">Analytics</h2>
            <p className="text-sm text-green-700">Your performance has improved by 12% this month.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <button
            onClick={() => router.push('/expert/add_article')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Article
          </button>
          <button
            onClick={() => router.push('/expert/manage_article')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Manage Article
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
