import React, { useState } from 'react'; 
import axios from 'axios'; 
import { Button, Card, Row, Col, Form, Alert, Spinner } from 'react-bootstrap'; 
import './Books.css';

const Books = ({ addBook }) => { 
  const [query, setQuery] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const handleSearch = async (e) => { 
    e.preventDefault(); 
    setError(''); 
    setBooks([]); 
    setLoading(true); 

    try { 
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { 
        params: { 
          q: query, 
          key: process.env.REACT_APP_GOOGLE_KEY, 
          maxResults: 40, 
          orderBy: 'relevance', 
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
    } finally { 
      setLoading(false); 
    } 
  };

  return ( 
    <div className="mini-biblioteca"> 
      <div className="search-card"> 
        <Form className="d-flex mb-2" onSubmit={handleSearch}> 
          <Form.Control 
            type="text" 
            placeholder="Procure por autor ou nome do livro" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className="search-input" 
          /> 
          <Button variant="primary" type="submit" className="button-search"> 
            Buscar 
          </Button> 
        </Form> 
      </div> 

      {loading && <Spinner animation="border" className="spinner-border" />} 

      {error && ( 
        <Alert variant="danger" className="mt-3"> 
          {error} 
        </Alert> 
      )} 

      <Row className="mt-5" xs={2} sm={2} md={3} lg={4}> 
        {books.map((book) => ( 
          <Col key={book.id} className="mb-4"> 
            <Card className="book-card"> 
              <Card.Img 
                variant="top" 
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193'} 
                alt={book.volumeInfo.title} 
              /> 
              <Card.Body> 
                <Card.Title className="card-title">{book.volumeInfo.title}</Card.Title> 
                <Card.Text className="card-text">{book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}</Card.Text> 
                <Button variant="primary" onClick={() => addBook(book)}> 
                  Adicionar à Biblioteca 
                </Button> 
              </Card.Body> 
            </Card> 
          </Col> 
        ))} 
      </Row> 
    </div> 
  ); 
};

export default Books;
