import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './clogin.css'; // Reuse login styling

function CSignup() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/signup', formData);
    alert(res.data.message);  // success
    navigate('/clogin');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // show backend error like "Phone number already registered"
    } else {
      alert('Error registering user.');
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
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
  type="tel"
  name="phone"
  placeholder="Phone Number [User ID]"
  value={formData.phone}
  onChange={(e) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 10) {
      setFormData({ ...formData, phone: input });
    }
  }}
  maxLength={10}
  required
/>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>

        <div className="signup-link">
          Already have an account? <a href="/clogin">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default CSignup;
