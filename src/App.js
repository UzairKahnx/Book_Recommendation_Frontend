// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Recommendations from './pages/Recommendation';
import Reviews from './pages/Reviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddBook from './pages/admin/AddBook';
import ManageBooks from './pages/admin/ManageBooks';
import ManageReviews from './pages/admin/ManageReviews';
import BookDetailPage from './pages/BookDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route for Admin Dashboard */}
        <Route
          path="/admin/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/AdminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-books"
          element={
            <ProtectedRoute>
              <ManageBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-reviews"
          element={
            <ProtectedRoute>
              <ManageReviews />
            </ProtectedRoute>
          }
        />

        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
