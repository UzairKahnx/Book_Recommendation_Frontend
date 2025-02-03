import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      console.log('Books fetched:', response.data); // Log the fetched data
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (book) => {
    setEditingBook({ ...book, imageFile: null }); // Initialize imageFile as null
  };

  const handleDelete = async (id) => {
    console.log('Deleting book with ID:', id); // Log the book ID
    try {
      const response = await axios.delete(`http://localhost:5000/api/books/${id}`);
      console.log('Delete response:', response.data); // Log the response
  
      if (response.status === 200) {
        // Remove the deleted book from the state
        setBooks(books.filter((book) => book._id !== id));
        alert('Book deleted successfully!');
      } else {
        alert('Failed to delete book. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
  
      // Detailed error logging
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response received from the server. Please check your connection.');
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editingBook.title);
    formData.append('author', editingBook.author);
    formData.append('genre', editingBook.genre);
    formData.append('description', editingBook.description);
    formData.append('existingImage', editingBook.image); // Add existing image path

    if (editingBook.imageFile) {
      formData.append('image', editingBook.imageFile); // Append the new image file
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/books/${editingBook._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setBooks(books.map((book) => (book._id === editingBook._id ? response.data : book))); // Update the book in the state
      setEditingBook(null); // Close the edit form
      alert('Book updated successfully!');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Books</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <div key={book._id} className="p-4 bg-white shadow-md rounded-lg">
              {book.image && (
                <img
                  src={`http://localhost:5000/${book.image}`}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-700">{book.genre}</p>
              <p className="text-gray-700">{book.description}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
  onClick={() => {
    console.log('Deleting book with ID:', book._id);
    handleDelete(book._id);
  }}
  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
>
  Delete
</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Genre</label>
                <input
                  type="text"
                  value={editingBook.genre}
                  onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingBook.description}
                  onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Book Image</label>
                <input
                  type="file"
                  onChange={(e) => setEditingBook({ ...editingBook, imageFile: e.target.files[0] })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {editingBook.image && !editingBook.imageFile && (
                  <img
                    src={`http://localhost:5000/${editingBook.image}`}
                    alt="Current Book Cover"
                    className="mt-2 w-24 h-24 object-cover rounded-md"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;