import React from 'react';
import NavBar from './NavBar/NavBar';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from './Library/Library';
import Books from './Books/Books';
import { auth } from './firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);


  return (
    <div className="App">
      <Router>
        <NavBar />
        <div className="content">
          <Routes>
            {user && <Route path="/" element={<Books/>}/>}
            {!user && <Route path="/" element={<Login />} /> }

            {user && <Route path="/library" element={<Library />} />}

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
