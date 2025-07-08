import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './city.css';

const City = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const searchInput = document.getElementById('city-search-input');
    const cards = document.querySelectorAll('.city-page .restaurant-card');

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        cards.forEach(card => {
          const name = card.getAttribute('data-name').toLowerCase();
          card.style.display = name.includes(query) ? 'block' : 'none';
        });
      });
    }
  }, []);

  return (
    <div className="city-page">
      <header className="city-header">
        <div className="city-header-wrapper">
          <div
            className="city-logo"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            BookMyTable™
          </div>

          <nav className="city-navbar">
            <div className="city-search-bar">
              <span className="city-search-icon">🔍</span>
              <input
                type="text"
                id="city-search-input"
                className="city-search-input"
                placeholder="Search for restaurant, cuisine or a dish"
              />
            </div>
          </nav>

          <div className="city-auth-links">
            <a href="/clogin">Log in</a>
            <a href="/csignup">Sign up</a>
          </div>
        </div>
      </header>

      <nav className="city-tabs">
        <div className="city-tab active">🍽️ Dining Out</div>
      </nav>

      <section className="city-restaurant-section">
        <h2>Most Popular Restaurants</h2>
        <p className="city-desc">
          Explore top-rated restaurants based on customer experiences and food quality.
        </p>

        <div className="city-restaurant-grid">
          <div className="restaurant-card" data-name="taj view restaurant">
            <div className="image-wrapper">
              <img src="images5.jpeg" alt="Taj View Restaurant" />
            </div>
            <div className="info">
              <div className="card-content">
                <div className="card-header">
                  <h3>Taj View Restaurant</h3>
                </div>
                <p>North Indian, Mughlai • 7 Reviews</p>
              </div>
            </div>
          </div>

          <div className="restaurant-card" data-name="samosa house">
            <div className="image-wrapper">
              <img src="images6.jpg" alt="Samosa House" />
            </div>
            <div className="info">
              <div className="card-content">
                <div className="card-header">
                  <h3>Samosa House</h3>
                </div>
                <p>Snacks, Street Food • 15 Reviews</p>
              </div>
            </div>
          </div>

          <div className="restaurant-card" data-name="the royal feast">
            <div className="image-wrapper">
              <img src="images7.jpg" alt="The Royal Feast" />
            </div>
            <div className="info">
              <div className="card-content">
                <div className="card-header">
                  <h3>The Royal Feast</h3>
                </div>
                <p>Luxury Dining • 17 Reviews</p>
              </div>
            </div>
          </div>

          <div className="restaurant-card" data-name="mughlai palace">
            <div className="image-wrapper">
              <img src="image1.jpg" alt="Mughlai Palace" />
            </div>
            <div className="info">
              <div className="card-content">
                <div className="card-header">
                  <h3>Mughlai Palace</h3>
                </div>
                <p>Mughlai, Indian • 6 Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default City;
