import React, { useEffect, useState } from 'react';
import api from '../api';

export default function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await api.get('/books');
    setBooks(res.data);
  };

  const deleteBook = async (id) => {
    if (window.confirm("Supprimer ce livre ?")) {
      await api.delete(`/books/${id}`);
      fetchBooks();
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Mes Livres</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>{book.title}</strong> – {book.author}
            <button onClick={() => deleteBook(book._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
