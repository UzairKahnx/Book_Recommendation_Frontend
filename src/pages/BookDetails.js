import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdStar, MdStarBorder } from 'react-icons/md';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    reviewerName: '',
    rating: 1,
    comment: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookResponse = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(bookResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:5000/api/books/${id}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        setError('Error fetching book details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBooks = async () => {
      if (!book) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/books?genre=${book.genre}`);
        setRelatedBooks(response.data.filter(b => b._id !== book._id));
      } catch (err) {
        console.error('Error fetching related books:', err);
        setError('Failed to fetch related books. Please try again later.');
      }
    };

    fetchRelatedBooks();
  }, [book]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${id}/reviews`, reviewForm);
      setReviews([...reviews, response.data]);
      setReviewForm({ reviewerName: '', rating: 1, comment: '' });
      alert('Review submitted successfully!');
    } catch (err) {
      alert('Failed to submit review. Please try again.');
    }
  };

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        index < rating ? <MdStar key={index} className="text-yellow-500" /> : <MdStarBorder key={index} className="text-gray-400" />
      ))}
    </div>
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center text-gray-500">Book not found.</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-200 to-purple-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6 flex-wrap md:flex-nowrap">
          <img
            src={`http://localhost:5000/${book.image.startsWith('uploads') ? book.image : `uploads/${book.image}`}`}
            alt={book.title}
            className="w-48 h-64 object-cover mb-4 rounded-lg shadow-md md:mb-0 md:mr-6"
          />
          <div className="ml-6 flex-1">
            <h1 className="text-3xl font-semibold text-gray-800">{book.title}</h1>
            <p className="text-gray-700"><strong>Author:</strong> {book.author}</p>
            <p className="text-gray-700"><strong>Genre:</strong> {book.genre}</p>
            <p className="text-gray-700 mt-2"><strong>Description:</strong> {book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-gray-700"><strong>{review.reviewerName}</strong></p>
                {renderStars(review.rating)}
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Review Submission */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                value={reviewForm.reviewerName}
                onChange={(e) => setReviewForm({ ...reviewForm, reviewerName: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <MdStar
                    key={num}
                    className={`cursor-pointer ${reviewForm.rating >= num ? 'text-yellow-500' : 'text-gray-400'}`}
                    onMouseEnter={() => setReviewForm({ ...reviewForm, rating: num })}
                    onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
                minLength="10"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Related Books Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.length === 0 ? (
              <p className="text-gray-500">No related books available.</p>
            ) : (
              relatedBooks.map((relatedBook) => (
                <div key={relatedBook._id} className="p-4 bg-white shadow-lg rounded-lg">
                  <img
                    src={`http://localhost:5000/${relatedBook.image.startsWith('uploads') ? relatedBook.image : `uploads/${relatedBook.image}`}`}
                    alt={relatedBook.title}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <Link to={`/book/${relatedBook._id}`} className="block text-xl font-semibold text-blue-600 hover:underline">
                    {relatedBook.title}
                  </Link>
                  <p className="text-gray-700">{relatedBook.author}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
