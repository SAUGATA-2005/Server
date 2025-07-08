import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './clogin.css'; // Reusing existing login styling

function ALogin() {
  const [username, setUsername] = useState('');  // changed from adminId to username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/adminlogin', {
        username,  // send username key here
        password,
      });

      alert(res.data.message); // "Admin login successful"
      // Redirect to admin dashboard or homepage
      navigate('/');
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div
        className="top-left-logo"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        BookMyTable
      </div>

      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default ALogin;
