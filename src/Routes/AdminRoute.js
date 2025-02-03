import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// AdminRoute component to protect admin routes
const AdminRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated (token stored in localStorage)



// src/routes/adminRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const AdminController = require('../controllers/AdminController'); // Assuming you have an AdminController

const router = express.Router();

// Protect the admin route with authMiddleware
router.post('/add-book', authMiddleware, AdminController.addBook); // Admin can add a book

module.exports = router;







  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" />} // Redirect to login if not authenticated
    />
  );
};

export default AdminRoute;
