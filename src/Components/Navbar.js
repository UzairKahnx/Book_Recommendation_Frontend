import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const toggleLogoutVisibility = () => {
    setIsLogoutVisible(!isLogoutVisible); // Toggle logout visibility on profile click
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Book Recommendation System</Link>
        </h1>

        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/recommendations" className="text-white hover:text-gray-300">Recommendations</Link>
          <Link to="/reviews" className="text-white hover:text-gray-300">Reviews</Link>

          {/* Show admin link only if the role is 'admin' */}
          {role === 'admin' && (
            <Link to="/admin" className="text-white hover:text-gray-300">Admin Panel</Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
            </>
          ) : (
            <div className="relative">
              <button className="text-white flex items-center" onClick={toggleLogoutVisibility}>
                <FaUserCircle className="mr-2" />
                Profile
              </button>
              {isLogoutVisible && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4 space-y-4">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
          <Link to="/recommendations" className="block px-4 py-2 hover:bg-gray-700">Recommendations</Link>
          <Link to="/reviews" className="block px-4 py-2 hover:bg-gray-700">Reviews</Link>

          {/* Show admin link only if the role is 'admin' */}
          {role === 'admin' && (
            <Link to="/admin/AdminDashboard" className="block px-4 py-2 hover:bg-gray-700">Admin Panel</Link>
          )}

          {!token ? (
            <>
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
              <Link to="/signup" className="block px-4 py-2 hover:bg-gray-700">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
