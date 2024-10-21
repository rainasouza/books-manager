import React, { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button} from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  const [user, setUser] = useState(null);

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
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <Navbar  variant="light" expand="lg" className="py-2 px-4">
      <Navbar.Brand as={Link} to="/" className="fs-4 text-dark">
        I Miei Libri
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/library" className="mx-2 text-dark">
                Biblioteca
              </Nav.Link>
              <Button onClick={handleLogout}  className="mx-2">
                Sair
              </Button>
            </>
          ) : (
            <>
              <Nav.Link> Dev by Raína </Nav.Link>
              
              <Nav.Link as={Link} to="https://developers.google.com/books?"> 
                Using Google Books API
                </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
