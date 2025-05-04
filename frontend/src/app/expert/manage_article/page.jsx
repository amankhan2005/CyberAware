'use client';

import axios from 'axios';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const mockArticles = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Cybersecurity Tip #${i + 1}`,
  category: 'Security',
  createdAt: '2025-05-01',
}));

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);





  const fetchArticles = async () => {
    const res = await axios.get('http://localhost:5000/articles/getall');
    console.log('Response:', res.data);
    if (res.status === 200) {
      setArticles(res.data);
      console.log('Articles fetched successfully:', res.data);
      toast.success('Articles fetched successfully!');
    } else {
      console.error('Failed to fetch articles');
        toast.error('Failed to fetch articles!');
    }
  }


    useEffect(() => {
      fetchArticles();
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Articles</h2>
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b">
                <td className="p-4">{article.title}</td>
                <td className="p-4">{article.category}</td>
                <td className="p-4">{article.createdAt}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageArticles;
