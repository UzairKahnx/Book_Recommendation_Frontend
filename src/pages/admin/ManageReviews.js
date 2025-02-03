import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://bookrecommendationbackend-production.up.railway.app/api/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`https://bookrecommendationbackend-production.up.railway.app/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Reviews</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Reviewer</th>
            <th className="px-4 py-2 text-left">Book</th>
            <th className="px-4 py-2 text-left">Rating</th>
            <th className="px-4 py-2 text-left">Comment</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td className="px-4 py-2">{review.reviewerName}</td>
              <td className="px-4 py-2">{review.bookId ? review.bookId.title : 'Unknown'}</td>
              <td className="px-4 py-2">{review.rating}</td>
              <td className="px-4 py-2">{review.comment}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReviews;
