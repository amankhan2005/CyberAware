'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';

// API base URL - can be configured based on environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Dynamically import JoditEditor with ssr disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <p className="text-indigo-300 italic">Loading editor...</p>
});

const AddArticle = () => {
    const [expertData, setExpertData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    let decodedExpert;

    useEffect(() => {
        // Get the expert data from sessionStorage
        try {
            const expert = localStorage.getItem('expert');
            decodedExpert = jwtDecode(expert);
            console.log("Decoded expert data:", decodedExpert);
            if (decodedExpert) {
                console.log("Expert data from session:", decodedExpert);
                setExpertData(decodedExpert);
            } else {
                console.warn("No expert data found in sessionStorage");
                toast.error("Please login as an expert first");
                // Redirect logic could go here
            }
        } catch (error) {
            console.error("Error reading expert data from session:", error);
        }
    }, []);

    // Form validation schema
    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().required('Cover image is required'),
        category: Yup.string().required('Category is required'),
        content: Yup.string().required('Content is required')
    });

    const articleForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: '',
            category: '',
            content: '',
            expertId: expertData?._id || '',
        },
        validationSchema,
        onSubmit: (values) => {
            setIsSubmitting(true);
            setFormErrors({});

            // Ensure expertId is included
            const submitData = {
                ...values,
                expertId: expertData?._id
            };
            
            // Debug log
            console.log("Submitting article data:", submitData);
            
            if (!submitData.expertId) {
                console.error("Missing expertId in submission data");
                toast.error("Expert ID is missing. Please login again.");
                setIsSubmitting(false);
                return;
            }
            
            axios.post(`${API_BASE_URL}/articles/add`, submitData)
                .then((res) => {
                    console.log("Article submission successful:", res.data);
                    toast.success('Article added successfully!');
                    articleForm.resetForm();
                    setIsSubmitting(false);
                })
                .catch((err) => {
                    console.error("Article submission error:", err);
                    console.error("Error response:", err.response?.data);
                    
                    // Handle validation errors
                    if (err.response?.data?.errors) {
                        setFormErrors(err.response.data.errors);
                        toast.error('Please correct the errors in your form');
                    } else {
                        toast.error('Failed to add article: ' + (err.response?.data?.message || err.message || 'Server error'));
                    }
                    setIsSubmitting(false);
                });
        }
    });

    // Update expertId whenever expertData changes
    useEffect(() => {
        if (expertData?._id) {
            console.log("Setting expertId:", expertData._id);
            articleForm.setFieldValue('expertId', expertData._id);
        }
    }, [expertData]);

    const upload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        toast.loading('Uploading image...');
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'cyberpolice');
        fd.append('cloud_name', 'dyzuggpt4');

        axios.post('https://api.cloudinary.com/v1_1/dyzuggpt4/image/upload', fd)
            .then((result) => {
                toast.dismiss();
                toast.success('Image uploaded successfully');
                // Set the image URL in Formik values
                articleForm.setFieldValue('image', result.data.secure_url);
                console.log(result.data);
            })
            .catch((err) => {
                toast.dismiss();
                console.error(err);
                toast.error('Failed to upload image');
            });
    };

    // Predefined categories
    const categories = [
        "Network Security",
        "Cloud Security",
        "Application Security",
        "Penetration Testing",
        "Security Architecture",
        "Incident Response",
        "Risk Management",
        "Cybersecurity Basics",
        "Digital Forensics",
        "Malware Analysis",
        "Other"
    ];

    return (
        <div className="min-h-screen relative bg-gradient-to-br from-indigo-950 to-black text-white">
            {/* Subtle geometric pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-12 z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            Create New Article
                        </span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        Share your cybersecurity knowledge and insights with the community. Your expertise helps others stay safe online.
                    </p>
                </div>

                <div className="bg-indigo-950/40 backdrop-blur-sm rounded-xl border border-indigo-800/30 shadow-xl p-8">
                    <form onSubmit={articleForm.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-indigo-200 mb-1">
                                Article Title *
                            </label>
                            <input
                                id="title"
                                name="title"
                                placeholder="Enter a clear, descriptive title"
                                value={articleForm.values.title}
                                onChange={articleForm.handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-indigo-200 mb-1">
                                Short Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Brief summary of your article (100-150 characters)"
                                value={articleForm.values.description}
                                onChange={articleForm.handleChange}
                                rows="2"
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            />
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-indigo-200 mb-1">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={articleForm.values.category}
                                onChange={articleForm.handleChange}
                                className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300"
                            >
                                <option value="" className="bg-indigo-950">Select category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category} className="bg-indigo-950">
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-indigo-200 mb-1">
                                Cover Image
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={upload}
                                            className="w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border border-indigo-700/40 focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400"
                                        />
                                    </div>
                                </div>
                                {articleForm.values.image && (
                                    <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                                        <img src={articleForm.values.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <input
                                name="image"
                                value={articleForm.values.image}
                                onChange={articleForm.handleChange}
                                className="sr-only"
                                readOnly
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-indigo-200 mb-1">
                                Article Content *
                            </label>
                            <div className="min-h-[300px] rounded-lg overflow-hidden">
                                <JoditEditor 
                                    value={articleForm.values.content}
                                    onChange={newContent => articleForm.setFieldValue('content', newContent)}
                                    config={{
                                        theme: 'dark',
                                        height: 400,
                                        buttons: [
                                            'source', '|', 'bold', 'italic', 'underline', 'strikethrough', '|',
                                            'font', 'fontsize', 'brush', 'paragraph', '|',
                                            'link', 'image', 'video', 'table', '|',
                                            'align', 'undo', 'redo', '|', 'hr', 'eraser', 'copyformat', '|',
                                            'symbol', 'fullsize'
                                        ]
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                                <span className="relative flex items-center">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        'Publish Article'
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/expert/dashboard" className="text-teal-400 hover:text-teal-300 text-sm">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddArticle;
