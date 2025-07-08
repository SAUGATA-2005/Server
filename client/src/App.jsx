import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './home';
import AddRestaurant from './add';
import City from './city';
import CLogin from './clogin';
import CSignup from './csignup';
import RSignup from './rsignup';
import RLogin from './rlogin';
import ALogin from './alogin'; // ✅ Import admin login

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-restaurant" element={<AddRestaurant />} />
        <Route path="/city" element={<City />} />
        <Route path="/clogin" element={<CLogin />} />
        <Route path="/csignup" element={<CSignup />} />
        <Route path="/rsignup" element={<RSignup />} />
        <Route path="/rlogin" element={<RLogin />} />
        <Route path="/alogin" element={<ALogin />} /> {/* ✅ Admin login route */}
      </Routes>
    </Router>
  );
}

export default App;
