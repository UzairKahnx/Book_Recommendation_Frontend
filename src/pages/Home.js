import React, { useEffect, useState } from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState(
    JSON.parse(localStorage.getItem('recommendedBooks')) || []
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    localStorage.setItem('recommendedBooks', JSON.stringify(recommendedBooks));
  }, [recommendedBooks]);

  const handleRecommendation = (book) => {
    const isBookRecommended = recommendedBooks.some((b) => b._id === book._id);
    if (isBookRecommended) {
      const updatedRecommendations = recommendedBooks.filter(
        (b) => b._id !== book._id
      );
      setRecommendedBooks(updatedRecommendations);
    } else {
      setRecommendedBooks([...recommendedBooks, book]);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-200 min-h-screen">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        Welcome to Our Book Collection!
      </motion.h1>

      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Recommended Books</h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <motion.div
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              {book.image && (
                <img
                  src={`http://localhost:5000/${book.image}`}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded-t-lg"
                />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <div className="mb-4">
                  <p className="text-gray-700 font-medium">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link to={`/book/${book._id}`} className="text-blue-500 hover:text-blue-700">
                    <HiOutlineEye size={24} />
                  </Link>

                  <button
                    onClick={() => handleRecommendation(book)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    {recommendedBooks.some((b) => b._id === book._id) ? (
                      <MdStar size={24} />
                    ) : (
                      <MdStarBorder size={24} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

