'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddArticle = () => {
    const articleForm = useFormik({
        initialValues: {
            title: '',
            description: '',
            image: '',
            category: '',
        },
        onSubmit: (values) => {
            axios.post('http://localhost:5000/articles/add', values)
                .then((res) => {
                    console.log(res.data);
                    toast.success('Article added successfully!');
                    articleForm.resetForm();
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Failed to add article!');
                });
        }
    });

    const upload = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'cyberpolice');
        fd.append('cloud_name', 'dyzuggpt4');

        axios.post('https://api.cloudinary.com/v1_1/dyzuggpt4/image/upload', fd)
            .then((result) => {
                toast.success('File uploaded successfully');
                // Set the image URL in Formik values
                articleForm.setFieldValue('image', result.data.secure_url);
                console.log(result.data);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Failed to upload file');
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Add New Article</h2>
                <form onSubmit={articleForm.handleSubmit} className="space-y-4">
                    <input
                        name="title"
                        placeholder="Title"
                        value={articleForm.values.title}
                        onChange={articleForm.handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        name="description"
                        placeholder="Short description"
                        value={articleForm.values.description}
                        onChange={articleForm.handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={upload}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        name="image"
                        placeholder="Image URL"
                        value={articleForm.values.image}
                        onChange={articleForm.handleChange}
                        className="w-full border px-4 py-2 rounded"
                        readOnly
                    />
                    <input
                        name="category"
                        placeholder="Category"
                        value={articleForm.values.category}
                        onChange={articleForm.handleChange}
                        className="w-full border px-4 py-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Publish Article
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddArticle;
