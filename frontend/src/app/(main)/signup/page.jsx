 'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
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
      confirmPassword: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await axios.post('http://localhost:5000/user/add', values);
        toast.success('User Created Successfully !!');
        resetForm();
        router.push('/login');
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong !!');
      }
    },
    validationSchema: SignupSchema,
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
            Create your account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={signupForm.handleSubmit} className="mt-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={signupForm.values.name}
            onChange={signupForm.handleChange}
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={signupForm.values.email}
            onChange={signupForm.handleChange}
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupForm.values.password}
            onChange={signupForm.handleChange}
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupForm.values.confirmPassword}
            onChange={signupForm.handleChange}
            className="w-full px-4 py-3 rounded-md bg-[#1e293b] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="group w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
