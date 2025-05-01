'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short..!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(7, 'Password is too short').required('Required'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {

    const router = useRouter();

    const signupForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
         },
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:5000/expert/add', values)
                .then((result) => {
                  console.log(result.data);
                    toast.success('User Created Successfully !!')
                    resetForm();
                    router.push('/login');
                }).catch((err) => {
                    console.log(err);
                    toast.error('Something went wrong !!')
                });
        },
        validationSchema: SignupSchema,
    })

  return (
    <div>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl rounded-lg p-10 max-w-md text-center border border-gray-200">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Register</h1>
          <p className="text-gray-700 text-lg mb-6">
            Create your account to get started.
          </p>
          <form onSubmit={signupForm.handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                type="text"
                id="name"
                onChange={signupForm.handleChange}
                value={signupForm.values.name}
                placeholder="Enter your full name"
                required=""
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                type="email"
                id="email"
                onChange={signupForm.handleChange}
                value={signupForm.values.email}

                placeholder="Enter your email"
                required=""
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                type="password"
                id="password"
                onChange={signupForm.handleChange}
                value={signupForm.values.password}
                placeholder="Create a password"
                required=""
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="confirmPassword"
              >
               Confirm Password
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                type="password"
                id="confirmPassword"
                onChange={signupForm.handleChange}
                value={signupForm.values.confirmPassword}
                placeholder="Confirm your Password"
                required=""
              />
            </div>
            <button type='submit' className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition w-full">
              Register
            </button>
          </form>
          <p className="text-gray-600 mt-4">
            Already have an account?
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup