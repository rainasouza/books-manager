import React, { useState } from 'react';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';

const Library = ({library}) => {


  return (
    <div className="biblioteca-pessoal">
      <h2>Minha Biblioteca</h2>
      {library.length === 0 ? (
        <p>Nenhum livro adicionado ainda.</p>
      ) : (
        <Row>
          {library.map((book) => (
            <Col md={4} key={book.id} className="mb-4">
              <Card className="library-book-card">
                <Card.Img
                  variant="top"
                  src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193'}
                  alt={book.volumeInfo.title}
                />
                <Card.Body>
                  <Card.Title>{book.volumeInfo.title}</Card.Title>
                  <Card.Text>{book.volumeInfo.authors?.join(', ') || 'Autor desconhecido'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
          ))}
        </Row>
      )}
    </div>
  )
}

export default Library