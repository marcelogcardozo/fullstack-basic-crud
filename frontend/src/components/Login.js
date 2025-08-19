import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome to CodeLeap network!</h2>
        <p>Please enter your username</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="John doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
          />
          <button 
            type="submit" 
            className={`enter-button ${!username.trim() ? 'disabled' : ''}`}
            disabled={!username.trim()}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;