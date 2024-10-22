import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <Navbar expand="lg" className="navbar shadow-sm" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to={user ? "/books" : "/"} className="navbar-brand">
          I Miei Libri
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/library" className="nav-link">
                  Meus Livros
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-link-logout">
                  Sair
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className="nav-link">
                  Dev by Raína
                </Nav.Link>
                <Nav.Link
                  href="https://developers.google.com/books?"
                  target="_blank"
                  className="nav-link"
                >
                  Usando a API do Google Books
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

