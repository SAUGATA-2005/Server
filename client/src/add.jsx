import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './add.css';

const AddRestaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="partner-container">
      <nav className="partner-navbar">
        <div
          className="partner-logo" // 🔁 Use className="partner-logo" (not top-left-logo)
          onClick={() => navigate('/')}
        >
          BookMyTable
        </div>

        <Link to="/rlogin" className="login-btn">Log in</Link>
      </nav>

      <div className="partner-content">
        <h1>Partner with BookMyTable</h1>
        <p>
          <span className="highlight">
            0% commission for 1st month! Valid for new restaurant partners in selected cities
          </span>
        </p>
        <div className="register-wrapper">
          <Link to="/rsignup">
            <button className="partner-btn">Register your restaurant</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
