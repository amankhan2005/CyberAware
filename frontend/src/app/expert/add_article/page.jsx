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
    const [charCount, setCharCount] = useState(0);
    const [isSavingDraft, setIsSavingDraft] = useState(false);
    const [showRequiredMessage, setShowRequiredMessage] = useState(false);

    let decodedToken;    useEffect(() => {
        // Get the expert data from localStorage
        try {
            const expert = localStorage.getItem('expert-token');
            if (expert) {
                const decoded = jwtDecode(expert);
                console.log("Decoded expert data:", decoded);
                setExpertData(decoded);
                
                // Update the expertId in the form values when decoded data is available
                articleForm.setFieldValue('expertId', decoded._id);
                console.log("Updated expertId in form:", decoded._id);
            } else {
                console.warn("No expert data found in localStorage");
                toast.error("Please login as an expert first");
                // Redirect to login page
                window.location.href = '/expert_login';
            }
        } catch (error) {
            console.error("Error reading expert data from localStorage:", error);
            toast.error("Error reading expert data. Please login again.");
            window.location.href = '/expert_login';
        }
    }, []);


    // Form validation schema
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Title is required')
            .min(5, 'Title should be at least 5 characters')
            .max(100, 'Title should not exceed 100 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(50, 'Description should be at least 50 characters')
            .max(300, 'Description should not exceed 300 characters'),
        image: Yup.string().required('Cover image is required'),
        category: Yup.string().required('Category is required'),
        content: Yup.string()
            .required('Content is required')
            .min(100, 'Content should be at least 100 characters'),
        expertId: Yup.string().required('Expert ID is required')
    });    const articleForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: '',
            category: '',
            content: '',
            expertId: '',  // Will be set in useEffect when expertData is available
            status: 'published'  // Changed from isDraft to status with proper value
        },
        validationSchema,        onSubmit: async (values) => {
            setIsSubmitting(true);
            setFormErrors({});
            
            // Ensure we have the latest expert ID
            if (!values.expertId && expertData?._id) {
                values.expertId = expertData._id;
            }
            
            // Prepare submission data
            const submitData = {
                ...values,
                status: isSavingDraft ? 'draft' : 'published'  // Use status field instead of isDraft
            };
            
            // Extra logging to debug expert ID issues
            console.log("Expert data from state:", expertData);
            console.log("Expert ID being used:", submitData.expertId);

            // Debug log
            console.log("Submitting article data:", submitData);

            if (!submitData.expertId) {
                console.error("Missing expertId in submission data");
                toast.error("Expert ID is missing. Please login again.");
                setIsSubmitting(false);
                return;
            }            try {
                // Log request details for debugging
                console.log(`Sending POST request to: ${API_BASE_URL}/articles/add`);
                console.log("Request headers:", {
                    'Content-Type': 'application/json'
                });
                
                // Make the API call with explicit headers
                const response = await axios.post(`${API_BASE_URL}/articles/add`, submitData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log("Article submission successful:", response.data);
                  if (submitData.status === 'draft') {
                    toast.success('Article saved as draft!');
                } else {
                    toast.success('Article published successfully!');
                }
                
                articleForm.resetForm();
                // Redirect to articles list or dashboard
                window.location.href = '/expert/dashboard';            } catch (err) {
                console.error("Article submission error:", err);
                
                // Enhanced error logging
                if (err.response) {
                    // Server responded with a non-2xx status code
                    console.error("Error status:", err.response.status);
                    console.error("Error headers:", err.response.headers);
                    console.error("Error data:", err.response.data);
                    
                    if (err.response.status === 404) {
                        console.error("The API endpoint might not exist or expert ID might be invalid");
                        toast.error("Server couldn't process your request. Expert ID may be invalid.");
                        
                        // Try to fix expert ID if it's a 404
                        if (expertData) {
                            console.log("Attempting to refresh expert ID from stored data...");
                            articleForm.setFieldValue('expertId', expertData._id);
                        } else {
                            toast.error("Session expired. Please log in again.");
                            setTimeout(() => window.location.href = '/expert_login', 2000);
                        }
                    } 
                    
                    if (err.response?.data?.errors) {
                        setFormErrors(err.response.data.errors);
                        toast.error('Please correct the errors in your form');
                        console.log('Form validation errors:', err.response.data.errors);
                    } else {
                        const errorMessage = err.response?.data?.message || 'Server error';
                        toast.error('Failed to add article: ' + errorMessage);
                    }
                } else if (err.request) {
                    // Request was made but no response received (network issue)
                    console.error("No response received:", err.request);
                    toast.error("Network error. Please check your connection and try again.");
                } else {
                    // Error in setting up the request
                    console.error("Error setting up request:", err.message);
                    toast.error("Error preparing request: " + err.message);
                }
            } finally {
                setIsSubmitting(false);
                setIsSavingDraft(false);
            }
        }
    });

    const handleSubmitAsDraft = () => {
        setIsSavingDraft(true);
        // We'll proceed with the regular submit which will use the isSavingDraft flag
        articleForm.handleSubmit();
    };
    
    const handlePublish = () => {
        setIsSavingDraft(false);
        // Log the form state before submission
        console.log('Form state before publish:', articleForm.values);
        console.log('Form errors:', articleForm.errors);
        console.log('Form validation state:', Object.keys(articleForm.errors).length === 0);
        
        // Manually trigger form submission
        articleForm.handleSubmit();
    };

    const upload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type and size before uploading
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            toast.error('Please upload an image file (JPEG, PNG, GIF, WEBP)');
            return;
        }

        if (file.size > maxSize) {
            toast.error('Image size should be less than 5MB');
            return;
        }

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

    // Handle description change to update character count
    const handleDescriptionChange = (e) => {
        const description = e.target.value;
        setCharCount(description.length);
        articleForm.handleChange(e);
    };

    // Show asterisk message on focus in any field
    const handleFieldFocus = () => {
        setShowRequiredMessage(true);
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
                    {showRequiredMessage && (
                        <div className="mb-4 text-yellow-300 text-sm flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Fields marked with * are required
                        </div>
                    )}

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
                                onBlur={articleForm.handleBlur}
                                onFocus={handleFieldFocus}
                                className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${
                                    articleForm.touched.title && articleForm.errors.title
                                        ? 'border-red-500'
                                        : 'border-indigo-700/40'
                                } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300`}
                            />
                            {articleForm.touched.title && articleForm.errors.title && (
                                <div className="mt-1 text-sm text-red-400">{articleForm.errors.title}</div>
                            )}
                            {formErrors.title && (
                                <div className="mt-1 text-sm text-red-400">{formErrors.title}</div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="description" className="block text-sm font-medium text-indigo-200">
                                    Short Description *
                                </label>
                                <span className={`text-xs ${
                                    charCount > 0 && charCount < 50 ? 'text-yellow-400' :
                                    charCount > 300 ? 'text-red-400' : 'text-indigo-400'
                                }`}>
                                    {charCount}/300 characters
                                </span>
                            </div>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Brief summary of your article (50-300 characters)"
                                value={articleForm.values.description}
                                onChange={handleDescriptionChange}
                                onBlur={articleForm.handleBlur}
                                onFocus={handleFieldFocus}
                                rows="2"
                                className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${
                                    articleForm.touched.description && articleForm.errors.description
                                        ? 'border-red-500'
                                        : 'border-indigo-700/40'
                                } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300`}
                            />
                            {articleForm.touched.description && articleForm.errors.description && (
                                <div className="mt-1 text-sm text-red-400">{articleForm.errors.description}</div>
                            )}
                            {formErrors.description && (
                                <div className="mt-1 text-sm text-red-400">{formErrors.description}</div>
                            )}
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
                                onBlur={articleForm.handleBlur}
                                onFocus={handleFieldFocus}
                                className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${
                                    articleForm.touched.category && articleForm.errors.category
                                        ? 'border-red-500'
                                        : 'border-indigo-700/40'
                                } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white placeholder-indigo-300`}
                            >
                                <option value="" className="bg-indigo-950">Select category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category} className="bg-indigo-950">
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {articleForm.touched.category && articleForm.errors.category && (
                                <div className="mt-1 text-sm text-red-400">{articleForm.errors.category}</div>
                            )}
                            {formErrors.category && (
                                <div className="mt-1 text-sm text-red-400">{formErrors.category}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-indigo-200 mb-1">
                                Cover Image *
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={upload}
                                            onFocus={handleFieldFocus}
                                            className={`w-full px-4 py-2.5 rounded-lg bg-indigo-950/50 border ${
                                                articleForm.touched.image && articleForm.errors.image
                                                    ? 'border-red-500'
                                                    : 'border-indigo-700/40'
                                            } focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all duration-300 outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-400`}
                                        />
                                    </div>
                                    <div className="text-xs text-indigo-300 mt-1">
                                        Supported: JPEG, PNG, GIF, WEBP (max 5MB)
                                    </div>
                                </div>
                                {articleForm.values.image && (
                                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md group relative">
                                        <img src={articleForm.values.image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => articleForm.setFieldValue('image', '')}
                                                className="p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <input
                                name="image"
                                value={articleForm.values.image}
                                onChange={articleForm.handleChange}
                                onBlur={articleForm.handleBlur}
                                className="sr-only"
                                readOnly
                            />
                            {articleForm.touched.image && articleForm.errors.image && (
                                <div className="mt-1 text-sm text-red-400">{articleForm.errors.image}</div>
                            )}
                            {formErrors.image && (
                                <div className="mt-1 text-sm text-red-400">{formErrors.image}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-indigo-200 mb-1">
                                Article Content *
                            </label>
                            <div className="min-h-[300px] rounded-lg overflow-hidden">
                                <JoditEditor
                                    value={articleForm.values.content}
                                    onChange={newContent => articleForm.setFieldValue('content', newContent)}
                                    onBlur={e => articleForm.handleBlur({target: {name: 'content'}})}
                                    onFocus={handleFieldFocus}
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
                            {articleForm.touched.content && articleForm.errors.content && (
                                <div className="mt-1 text-sm text-red-400">{articleForm.errors.content}</div>
                            )}
                            {formErrors.content && (
                                <div className="mt-1 text-sm text-red-400">{formErrors.content}</div>
                            )}
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={handleSubmitAsDraft}
                                className="px-6 py-3 bg-indigo-700/50 text-white rounded-lg transition-all duration-300 hover:bg-indigo-700/70 text-sm font-medium relative disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="flex items-center">
                                    {isSubmitting && isSavingDraft ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                            Save as Draft
                                        </>
                                    )}
                                </span>
                            </button>                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={handlePublish}
                                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
                                <span className="relative flex items-center">
                                    {isSubmitting && !isSavingDraft ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Publish Article
                                        </>
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
