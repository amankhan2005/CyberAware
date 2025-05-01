 'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:5000/user/authenticate', values);
        toast.success('Login Successful');
        localStorage.setItem('user', JSON.stringify(response.data));
        router.push('/user/profile');
      } catch (err) {
        toast.error('Login Failed');
      }
    }
  });

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-purple-700">Cyber<span className="text-black">Aware</span></h1>
        </div>

        {/* Welcome Text */}
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Please enter your details</p>

          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-purple-600" />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="text-purple-700 hover:underline">Forgot password</a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
            >
              <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-purple-700 hover:underline font-medium">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-1/2 bg-purple-200">
        <img
          src="/cyber-login-illustration.png"
          alt="Cyber login art"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
