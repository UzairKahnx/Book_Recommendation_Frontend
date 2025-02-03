import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Reviews = () => {
  const { id } = useParams(); // Extract book ID
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Book ID is missing from URL.");
      setError("Book ID is missing.");
      setTimeout(() => navigate("/"), 3000); // Redirect back to home
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://bookrecommendationbackend-production.up.railway.app/api/books/${id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, [id, navigate]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="p-4 bg-gray-100 rounded-md mb-2">
          <p><strong>{review.reviewerName}</strong></p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
