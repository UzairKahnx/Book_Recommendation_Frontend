import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bookrecommendationbackend-production.up.railway.app/api/auth/login", { email, password });
      const { token, role } = response.data;
      
      if (!token || !role) {
        setError("Login failed. Please try again.");
        return;
      }
      
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate(role === "admin" ? "/admin/AdminDashboard" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
