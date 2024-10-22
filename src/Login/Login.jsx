import React, { useState } from "react";
import { auth, provider, signInWithPopup} from "../firebaseConfig";
import { Container, Button, Alert, Card } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const navigateToBooks = () => {
    navigate("/books")
  }

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setError('');
      navigateToBooks();
    } catch (error) {
      setError(error.message);
    }
  };



  return (
    <Container className={`login-container ${user ? 'third-color' : 'second-color'}`}>
      <Card className="custom-card text-center">
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {user ? (
            navigateToBooks()
          ) : (
            <>
              <Card.Header className="card-header">Gerencie suas Leituras</Card.Header>
              <Card.Body>
                <Card.Title className="card-title">Que Bom Ver Você</Card.Title>
                <Card.Text className="card-text">
                  Entre na sua estante com o Google.
                </Card.Text>
                <Button onClick={handleLogin} className="google-button">
                  <FcGoogle className="me-2" /> Login com Google
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">E Se Divirta!</Card.Footer>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
