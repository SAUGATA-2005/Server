import React, { useState } from 'react';
import './rsignup.css'; // ✅ Using new CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RSignup() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    photo: null,
    menuItems: [{ item: '', price: '' }],
    contact: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMenuChange = (index, field, value) => {
    const updatedMenu = [...formData.menuItems];
    updatedMenu[index][field] = value;
    setFormData({ ...formData, menuItems: updatedMenu });
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, { item: '', price: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('city', formData.city);
    data.append('contact', formData.contact);
    data.append('password', formData.password);
    data.append('photo', formData.photo);
    data.append('menu', JSON.stringify(formData.menuItems));

    try {
      const res = await axios.post('http://localhost:5000/rsignup', data);
      alert(res.data.message);
      navigate('/rlogin');
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Restaurant signup failed.");
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


      <div className="login-container" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <h2>Restaurant Signup</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            {["Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"].map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </select>

          <label htmlFor="photo-upload" style={{ fontWeight: 600, marginBottom: '5px', textAlign: 'left', display: 'block' }}>
            Upload Photo
          </label>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <div>
            <h4 style={{ marginTop: '20px' }}>Menu Items</h4>
            {formData.menuItems.map((menu, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={menu.item}
                  onChange={(e) => handleMenuChange(index, 'item', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price ₹"
                  value={menu.price}
                  onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addMenuItem} style={{ marginBottom: '10px' }}>
              ➕ Add Item
            </button>
          </div>

          <input
  type="tel"
  name="contact"
  placeholder="Phone Number [User ID]"
  value={formData.contact}
  onChange={(e) => {
    const input = e.target.value.replace(/\D/g, ''); // allow only digits
    if (input.length <= 10) {
      setFormData({ ...formData, contact: input });
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
          Already registered? <a href="/rlogin">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default RSignup;
