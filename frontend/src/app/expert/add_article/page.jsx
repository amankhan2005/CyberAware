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
            content: ''
        },
        onSubmit:  (values) => {
            axios.post('http://localhost:5000/articles/add', values)
                .then((res) => {
                    console.log(res.data);
                    // alert('Article added successfully!');
                    toast.success('Article added successfully!');
                    articleForm.resetForm();
                })
                .catch((err) => {
                    console.error(err);
                    // alert('Failed to add article!');
                    toast.error('Failed to add article!');
                });

    }
})



const upload = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'Mernbatch8')
    fd.append('colud_name', 'dgx8094we')

    axios.post('https://api.cloudinary.com/v1_1/dgx8094we/image/upload', fd)
        .then((result) => {
            toast.success('file upload successfully');
            // Set the imageurl in formik values automatically
            documenForms.setFieldValue('imageurl', result.data.secure_url);
            console.log(result.data);
        }).catch((err) => {
            console.log(err);
            toast.error('failed to upload file');
    });
}


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
            name="image"
            placeholder="Image URL"
            value={articleForm.values.image}
            onChange={articleForm.handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={articleForm.values.category}
            onChange={articleForm.handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="content"
            placeholder="Full article content"
            value={articleForm.values.content}
            onChange={articleForm.handleChange}
            rows={6}
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
