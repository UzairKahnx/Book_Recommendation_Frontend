import React, { useState, useEffect } from 'react';
import { HiOutlineEye } from 'react-icons/hi';
import { MdStar, MdStarBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Recommendation = () => {
  const [recommendedBooks, setRecommendedBooks] = useState(
    JSON.parse(localStorage.getItem('recommendedBooks')) || []
  );

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
    <div className="min-h-screen p-6 bg-gradient-to-r from-blue-200 to-purple-300">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        Your Recommended Books
      </motion.h1>

      {recommendedBooks.length === 0 ? (
        <p className="text-lg text-gray-700 text-center">No books recommended yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedBooks.map((book) => (
            <motion.div
              key={book._id}
              className="p-6 bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              {book.image && (
                <img
                  src={`http://localhost:5000/${book.image}`}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-700">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-gray-700">
                  <strong>Genre:</strong> {book.genre}
                </p>

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

export default Recommendation;
