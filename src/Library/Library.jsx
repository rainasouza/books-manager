import React, { useState } from 'react';
import { Button, Card, Row, Col, Modal} from 'react-bootstrap';

const Library = ({library}) => {
  const [selectedBook, setSelectedBook] = useState(null)
  const handleClose = () => setSelectedBook(null);
  const handleShow = (book) => setSelectedBook(book);


  return (
    <div className="biblioteca-pessoal">
      <h2>Minha Biblioteca</h2>
      {library.length === 0 ? (
        <p>Nenhum livro adicionado ainda.</p>
      ) : (
    
  <div>
      <Row className="mt-5" xs={2} sm={2} md={4} lg={5}>
        {library.map((book) => (
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

          </Modal.Footer>
        </Modal>
      )}
      </div>
      )}
    </div>
  )
}

export default Library