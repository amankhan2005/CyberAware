'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllNews, deleteNews } from '@/services/newsService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor with ssr disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
    loading: () => <p className="text-indigo-300 italic">Loading editor...</p>
});

const NewsManagement = () => {
    const router = useRouter();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        'Data Breach',
        'Malware',
        'Phishing',
        'Ransomware',
        'Vulnerability',
        'Regulation',
        'Industry News',
        'Other'
    ];

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').min(5).max(200),
        description: Yup.string().required('Description is required').min(50).max(1000),
        content: Yup.string().required('Content is required').min(100),
        image: Yup.string().required('Image is required'),
        source: Yup.string().required('Source is required'),
        sourceUrl: Yup.string().url('Must be a valid URL'),
        category: Yup.string().required('Category is required').oneOf(categories),
        isPublished: Yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            image: '',
            source: '',
            sourceUrl: '',
            category: '',
            isPublished: true
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('token');
                if (editingNews) {
                    await updateNews(editingNews._id, values, token);
                    toast.success('News updated successfully');
                } else {
                    await addNews(values, token);
                    toast.success('News added successfully');
                }
                setShowAddModal(false);
                setEditingNews(null);
                formik.resetForm();
                fetchNews();
            } catch (error) {
                toast.error(error.message || 'An error occurred');
            }
        }
    });

    const fetchNews = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                category: selectedCategory
            };
            const response = await getAllNews(params);
            setNews(response.data);
            setTotalPages(response.pagination.pages);
        } catch (error) {
            toast.error('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, [currentPage, searchTerm, selectedCategory]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this news article?')) {
            try {
                const token = localStorage.getItem('token');
                await deleteNews(id, token);
                toast.success('News deleted successfully');
                fetchNews();
            } catch (error) {
                toast.error('Failed to delete news');
            }
        }
    };

    const handleEdit = (newsItem) => {
        setEditingNews(newsItem);
        formik.setValues(newsItem);
        setShowAddModal(true);
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'cyberpolice');
        formData.append('cloud_name', 'dyzuggpt4');

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/dyzuggpt4/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            formik.setFieldValue('image', data.secure_url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload image');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        News Management
                    </h1>
                    <button
                        onClick={() => {
                            setEditingNews(null);
                            formik.resetForm();
                            setShowAddModal(true);
                        }}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                        Add News
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* News List */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {news.map((item) => (
                            <div
                                key={item._id}
                                className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 p-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                        <p className="text-indigo-300 mb-4">{item.description}</p>
                                        <div className="flex gap-4 text-sm text-indigo-400">
                                            <span>Category: {item.category}</span>
                                            <span>Views: {item.views}</span>
                                            <span>Status: {item.isPublished ? 'Published' : 'Draft'}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded ${
                                currentPage === page
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-indigo-950/50 text-indigo-300 hover:bg-indigo-900/50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-indigo-950 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingNews ? 'Edit News' : 'Add News'}
                            </h2>
                            <form onSubmit={formik.handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Content
                                    </label>
                                    <JoditEditor
                                        value={formik.values.content}
                                        onChange={(content) => formik.setFieldValue('content', content)}
                                        config={{
                                            theme: 'dark',
                                            height: 300
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={uploadImage}
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Source
                                    </label>
                                    <input
                                        type="text"
                                        name="source"
                                        value={formik.values.source}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Source URL
                                    </label>
                                    <input
                                        type="url"
                                        name="sourceUrl"
                                        value={formik.values.sourceUrl}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-indigo-200 mb-1">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="isPublished"
                                        checked={formik.values.isPublished}
                                        onChange={formik.handleChange}
                                        className="rounded border-indigo-700/40 text-teal-500 focus:ring-teal-500/20"
                                    />
                                    <label className="text-sm font-medium text-indigo-200">
                                        Publish immediately
                                    </label>
                                </div>

                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            setEditingNews(null);
                                            formik.resetForm();
                                        }}
                                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                                    >
                                        {editingNews ? 'Update' : 'Add'} News
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsManagement; 