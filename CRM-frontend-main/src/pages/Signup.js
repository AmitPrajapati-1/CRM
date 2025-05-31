import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://crm-backend-production-a717.up.railway.app/api/auth/signup',
        { email, password }
      );
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] animate-backgroundSlide font-poppins">
      {/* Floating Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500 opacity-20 rounded-full blur-3xl animate-floatSlow" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-400 opacity-30 rounded-full blur-2xl animate-floatFast" />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-widest drop-shadow-md">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-white font-medium tracking-wide">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-white font-medium tracking-wide">Password</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-xl transition duration-300 hover:shadow-pink-400 hover:brightness-110"
          >
            Signup
          </motion.button>
        </form>

        <p className="mt-6 text-center text-white text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-pink-300 hover:text-pink-400 underline font-semibold transition"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
