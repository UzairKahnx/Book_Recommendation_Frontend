// src/components/SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage to log out
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
