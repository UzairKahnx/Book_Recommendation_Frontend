import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/admin/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-gray-800 text-center"
      >
        Admin Dashboard
      </motion.h1>
      <ul className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-lg mb-6">
        {data.map((item) => (
          <motion.li 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 border-b last:border-none"
          >
            {item.name}
          </motion.li>
        ))}
      </ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/admin/add-book" className="block p-6 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-300">
            <h2 className="text-xl font-semibold">Add Book</h2>
            <p className="text-gray-700">Upload a new book to the system.</p>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/admin/manage-books" className="block p-6 bg-green-100 rounded-lg shadow-md hover:bg-green-200 transition duration-300">
            <h2 className="text-xl font-semibold">Manage Books</h2>
            <p className="text-gray-700">Edit or delete existing books.</p>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/admin/manage-reviews" className="block p-6 bg-yellow-100 rounded-lg shadow-md hover:bg-yellow-200 transition duration-300">
            <h2 className="text-xl font-semibold">Manage Reviews</h2>
            <p className="text-gray-700">View or delete user reviews.</p>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;