'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useState } from 'react';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short..!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(7, 'Password is too short').required('Required'),
  confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const Signup = () => {
  const router = useRouter();
  const [backendError, setBackendError] = useState('');

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setBackendError('');
        const result = await axios.post('http://localhost:5000/users/add', values);
        toast.success('User Created Successfully !!');
        resetForm();
        router.push('/login');
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.message) {
          setBackendError(err.response.data.message);
        } else {
          toast.error('Something went wrong !!');
        }
      }
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-200">
            CyberAware
          </h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Create your account
          </h2>
        </div>          {/* Form */}
        <form onSubmit={signupForm.handleSubmit} className="mt-8 space-y-4">
          {backendError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{backendError}</span>
            </div>
          )}
          <div className="space-y-1">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={signupForm.values.name}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              className={`w-full px-4 py-3 rounded-md bg-indigo-950/50 border ${signupForm.touched.name && signupForm.errors.name
                  ? 'border-red-500'
                  : 'border-indigo-700/40'
                } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <div className="text-red-400 text-xs pl-1">{signupForm.errors.name}</div>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={signupForm.values.email}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              className={`w-full px-4 py-3 rounded-md bg-indigo-950/50 border ${signupForm.touched.email && signupForm.errors.email
                  ? 'border-red-500'
                  : 'border-indigo-700/40'
                } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <div className="text-red-400 text-xs pl-1">{signupForm.errors.email}</div>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupForm.values.password}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              className={`w-full px-4 py-3 rounded-md bg-indigo-950/50 border ${signupForm.touched.password && signupForm.errors.password
                  ? 'border-red-500'
                  : 'border-indigo-700/40'
                } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <div className="text-red-400 text-xs pl-1">{signupForm.errors.password}</div>
            )}
          </div>

          <div className="space-y-1">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={signupForm.values.confirmPassword}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              className={`w-full px-4 py-3 rounded-md bg-indigo-950/50 border ${signupForm.touched.confirmPassword && signupForm.errors.confirmPassword
                  ? 'border-red-500'
                  : 'border-indigo-700/40'
                } text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
              <div className="text-red-400 text-xs pl-1">{signupForm.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-indigo-200">
          Already have an account?{' '}
          <a href="/login" className="text-teal-400 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
