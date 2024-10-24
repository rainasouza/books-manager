import React, { useState } from 'react'; 
import axios from 'axios'; 
import { Button, Card, Row, Col, Form, Alert, Spinner, Modal } from 'react-bootstrap'; 
import './Books.css';

const Books = ({ addBook }) => { 
  const [query, setQuery] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);
  
  //modal, react bootstrap
  const [selectedBook, setSelectedBook] = useState(null)
  const handleClose = () => setSelectedBook(null);
  const handleShow = (book) => setSelectedBook(book);


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

      {/* Corpo de cada livro */}
      <Row className="mt-5" xs={2} sm={2} md={4} lg={5}>
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
                <Card.Text className="card-text">
                  {book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}
                </Card.Text>

                {/* Botão para abrir o modal */}
                <Button className="primary-button" onClick={() => handleShow(book)}>
                  Informações
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para o livro selecionado */}
      {selectedBook && (
        <Modal show={true} onHide={handleClose} centered>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>{selectedBook.volumeInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <h6>{selectedBook.volumeInfo.publisher}, {selectedBook.volumeInfo.publishedDate}</h6>
            <p>{selectedBook.volumeInfo.description || 'Descrição não disponível'}</p>
            <h6>{selectedBook.volumeInfo.pageCount} páginas</h6>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button className="secondary-button" onClick={handleClose}>
              Fechar
            </Button>
            <Button className="primary-button" onClick={() => addBook(selectedBook)}>
              Adicionar à Biblioteca
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  ); 
};

export default Books;
