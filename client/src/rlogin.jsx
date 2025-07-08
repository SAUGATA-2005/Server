// rlogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './clogin.css'; // Same styles reused

function RLogin() {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/rlogin', {
        contact,
        password,
      });

      alert(res.data.message); // Login successful
      navigate('/'); // redirect to homepage (or restaurant dashboard later)
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
        <h2>Restaurant Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID [Phone Number]"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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

        <p className="signup-link">
          Don’t have an account? <Link to="/rsignup">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default RLogin;
