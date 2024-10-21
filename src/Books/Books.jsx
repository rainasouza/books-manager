import React, { useState } from 'react';
import axios from 'axios';
//get by search
const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setBooks([]);

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: search,
          key: process.env.REACT_APP_GOOGLE_KEY,
        },
      });

      if (response.data.items) {
        setBooks(response.data.items);
      } else {
        setError('Nenhum livro encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      setError('Ocorreu um erro ao buscar livros.');
    }
  };

  return (
    <div>
      <h2>Pesquisar Livros</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o título ou autor"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p>{error}</p>}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
