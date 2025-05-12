'use client';

import axios from 'axios';
import { use, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const mockArticles = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Cybersecurity Tip #${i + 1}`,
  category: 'Security',
  createdAt: '2025-05-01',
}));

const ManageArticles = () => {
  const [articles, setArticles] = useState([]);

  const token = localStorage.getItem('expert-token');
  const decodedToken = jwtDecode(token);

  const userId = decodedToken._id;
  console.log('Decoded Token:', userId);


  const fetchArticles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/experts/${userId}/articles`);
      if (res.status === 200) {
        setArticles(res.data);
        console.log('Articles fetched successfully:', res.data);
        toast.success('Articles fetched successfully!');
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch articles!');
    }
  }


    useEffect(() => {
      fetchArticles();
    }, []);


    const handleDelete = async (id) => {
      const res = await axios.delete(`http://localhost:5000/articles/delete/${id}`)
      .then(() =>{
        toast.success('Article deleted successfully!');
        fetchArticles();
      })
      .catch((err) => {
        toast.error('Failed to delete article!');
        console.log(err);
      })
    }

  return (
    <div className="min-h-screen bg-gray-00 p-8">
      <h2 className="text-2xl font-bold mb-6">Manage Articles</h2>
      <div className="shadow-md overflow-hidden">
        <table className="w-full border  table-auto text-left">
          <thead className="bg-gray-900">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">{article.title}</td>
                <td className="p-4">{article.category}</td>
                <td className="p-4">{article.createdAt}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(article._id)}
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
