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
      password: '',
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
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Heading */}
        <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
               Login
            </span>
          </h1>
          <p className="text-slate-300 max-w-md mx-auto">
            Sign in to access your account, and see what are the things going on in the cyber world.
          </p>
          
        </div>

        {/* Form */}
        <form onSubmit={loginForm.handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              name="email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              required
              placeholder="Email address"
              className="appearance-none relative block w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                required
                placeholder="Password"
                className="appearance-none relative block w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm">
                <a href="#" className="text-teal-400 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 hover:from-teal-400 hover:to-indigo-400 text-sm font-medium relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
  Don’t have an account?{' '}
  <a href="/signup" className="text-teal-400 hover:underline font-medium">
    Register here
  </a>
</p>
<p className="mt-6  text-lg  text-center  text-slate-400">
  Are you a expert? {' '}
  <a href="/expert_login" className=" text-teal-400 hover:underline font-medium">
    Click here
  </a>
</p>

      </div>
    </div>
  );
};

export default Login;
