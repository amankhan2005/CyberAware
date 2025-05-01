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
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
            CyberAware
          </h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
            Sign in to your account
          </h2>
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
            className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
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
