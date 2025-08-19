import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('codeleap_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('codeleap_user', username);
    navigate('/main');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('codeleap_user');
    navigate('/');
  };

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to="/main" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/main" 
          element={
            user ? (
              <Dashboard username={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
