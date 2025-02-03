import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get user role

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role on logout
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <h1 className="text-white text-lg">Admin Dashboard</h1>
      {role === 'admin' && ( // Show Sign Out only for admin
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default AdminNavbar;
