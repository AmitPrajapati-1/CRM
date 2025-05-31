import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle traditional login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://crm-backend-production-a717.up.railway.app/api/auth/login',
        { email, password }
      );
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  // Redirect to Google OAuth
  const handleGoogleLogin = () => {
    window.location.href = 'https://crm-backend-production-a717.up.railway.app/api/auth/google';
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] animate-backgroundSlide font-poppins">

      {/* Floating background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500 opacity-20 rounded-full filter blur-3xl animate-floatSlow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-30 rounded-full filter blur-2xl animate-floatFast" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10"
      >
        {/* Heading */}
        <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-widest drop-shadow-md">
          Sign In
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-white font-medium tracking-wide">
              Email
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-white font-medium tracking-wide">
              Password
            </label>
            <motion.input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              whileFocus={{ scale: 1.02 }}
              className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-xl transition duration-300 hover:shadow-pink-400 hover:brightness-110"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="my-6 text-center text-white text-sm font-light">— OR —</div>

        {/* Google Sign-In Button */}
        <motion.button
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center py-3 bg-white text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </motion.button>

        {/* Signup Link */}
        <p className="mt-6 text-center text-white text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-pink-300 hover:text-pink-400 underline font-semibold transition"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
