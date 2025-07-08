import React from 'react';
import './first.css';
import './second.css';
import './footer.css';
import lounge from './lounge.jpg';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <div
        className="hero"
        style={{ backgroundImage: `url(${lounge})` }}
      >
        <div className="navbar">
          <div className="nav-links">
            <Link to="/add-restaurant">Add restaurant</Link>
            <Link to="/clogin">Log in</Link>
            <Link to="/csignup">Sign up</Link>
            <Link to="/alogin">Admin</Link>
          </div>
        </div>
        <div className="hero-content">
          <h1 className="logo">BookMyTable</h1>
          <p className="hero-subtitle">Find the best restaurants in India</p>
        </div>
      </div>

      <section className="location-section">
        <h1>
          Popular locations in <img src="images4.jpg" alt="India Flag" className="flag" /> India
        </h1>
        <p className="location-subtitle">
          From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food.
          <br />
          Explore menus, and millions of restaurant photos and reviews from users just like you, to find your next great meal.
        </p>

       <div className="grid">
  <Link to="/city" className="location-card">Delhi NCR Restaurants</Link>
  <Link to="/city" className="location-card">Mumbai Restaurants</Link>
  <Link to="/city" className="location-card">Bengaluru Restaurants</Link>
  <Link to="/city" className="location-card">Hyderabad Restaurants</Link>
  <Link to="/city" className="location-card">Chennai Restaurants</Link>
  <Link to="/city" className="location-card">Kolkata Restaurants</Link>
  <Link to="/city" className="location-card">Pune Restaurants</Link>
  <Link to="/city" className="location-card">Ahmedabad Restaurants</Link>
  <Link to="/city" className="location-card">Jaipur Restaurants</Link>
  <Link to="/city" className="location-card">Lucknow Restaurants</Link>
</div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h1><i>BookMytable</i></h1>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>About BookMytable</h4>
              <ul>
                <li>Who We Are</li>
                <li>Blog</li>
                <li>Work With Us</li>
                <li>Report Fraud</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>BookMYverse</h4>
              <ul>
                <li>BookMytable</li>
                <li>District</li>
                <li>Feeding India</li>
                <li>BookMytable Live</li>
                <li>BookMyland</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>For Restaurants</h4>
              <ul>
                <li>Partner With Us</li>
                <li>Apps For You</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Learn More</h4>
              <ul>
                <li>Privacy</li>
                <li>Security</li>
                <li>Terms</li>
              </ul>
            </div>

            <div className="footer-column social">
              <h4>Social Links</h4>
              <div className="social-icons">
                <span>🔗</span>
                <span>📸</span>
                <span>❌</span>
                <span>▶️</span>
                <span>📘</span>
              </div>
              <div className="app-buttons">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.
            All trademarks are properties of their respective owners. 2025-2025 © BookMyTable™ Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
