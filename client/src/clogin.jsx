import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './clogin.css';

function CLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/login', {
        phone: userId,
        password: password,
      });

      alert(res.data.message); // Login successful

      // Redirect to home or dashboard
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Invalid credentials
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID [Phone Number]"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <p className="signup-link">
          Don't have an account? <Link to="/csignup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default CLogin;
