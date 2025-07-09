require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const Customer = require('./models/Customer');
const Restaurant = require('./models/Restaurant');
const Admin = require('./models/Admin');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://project-bookmytable.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ---------- Multer Setup ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- MongoDB Connection ----------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ---------- Customer Signup ----------
app.post('/signup', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await Customer.findOne({ phone });
    if (existing) return res.status(400).json({ message: 'Phone number already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({ name, phone, password: hashedPassword });

    await newCustomer.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// ---------- Customer Login ----------
app.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await Customer.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------- Restaurant Signup ----------
app.post('/rsignup', upload.single('photo'), async (req, res) => {
  try {
    const { name, city, menu, contact, password, tables } = req.body;
    const photo = req.file ? req.file.path : null;

    const parsedMenu = menu ? JSON.parse(menu) : [];
    const existing = await Restaurant.findOne({ contact });
    if (existing) return res.status(400).json({ message: 'Contact already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRestaurant = new Restaurant({
      name,
      city,
      photo,
      menu: parsedMenu,
      contact,
      password: hashedPassword,
      tables: Number(tables),
    });

    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant registered successfully' });
  } catch (err) {
    console.error('❌ Restaurant signup error:', err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// ---------- Restaurant Login ----------
app.post('/rlogin', async (req, res) => {
  try {
    const { contact, password } = req.body;
    const rest = await Restaurant.findOne({ contact });
    if (!rest) return res.status(400).json({ message: 'Invalid restaurant credentials' });

    const isMatch = await bcrypt.compare(password, rest.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid restaurant credentials' });

    res.status(200).json({ message: 'Restaurant login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------- Admin Login ----------
app.post('/adminlogin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid admin credentials' });

    if (admin.password !== password) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    res.status(200).json({ message: 'Admin login successful' });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ---------- Get Restaurants by City ----------
app.get('/restaurants', async (req, res) => {
  const { city } = req.query;
  try {
    const list = await Restaurant.find({ city });
    res.json(list);
  } catch (err) {
    console.error('❌ Error fetching restaurants:', err);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
});

// ---------- Book Table (with duplicate prevention) ----------
app.post('/book-table', async (req, res) => {
  const { restaurantId, customerPhone, date } = req.body;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const existingBooking = await Booking.findOne({
      customerPhone,
      restaurantName: restaurant.name,
      city: restaurant.city,
      date
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked this restaurant on this date' });
    }

    if (restaurant.tables <= 0) {
      return res.status(400).json({ message: 'No tables available' });
    }

    restaurant.tables -= 1;
    await restaurant.save();

    const newBooking = new Booking({
      customerPhone,
      restaurantName: restaurant.name,
      city: restaurant.city,
      date,
      menu: restaurant.menu
    });
    await newBooking.save();

    res.status(200).json({ message: 'Table booked successfully' });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
});

// ---------- Get Customer Bookings ----------
app.get('/bookings', async (req, res) => {
  try {
    const { customerPhone } = req.query;
    if (!customerPhone) return res.status(400).json({ message: 'Missing customer phone' });

    const bookings = await Booking.find({ customerPhone });
    res.json(bookings);
  } catch (err) {
    console.error('❌ Fetch bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
