import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: null,
  });

  const handleFileChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('description', book.description);
    if (book.image) {
      formData.append('image', book.image);
    }

    try {
      const response = await axios.post('https://bookrecommendationbackend-production.up.railway.app/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Book added successfully!');
      console.log('Book added:', response.data);
      setBook({ title: '', author: '', genre: '', description: '', image: null }); // Reset form
      window.location.reload(); // Refresh the page to update the book list
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Add Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <input
            type="text"
            value={book.genre}
            onChange={(e) => setBook({ ...book, genre: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={book.description}
            onChange={(e) => setBook({ ...book, description: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Book Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;