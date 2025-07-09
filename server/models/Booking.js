const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerPhone: { type: String, required: true },
  customerName: { type: String, required: true },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: String, required: true }, // You can also use Date type
  menu: [
    {
      name: String,
      price: Number
    }
  ]
});

module.exports = mongoose.model('Booking', bookingSchema);
