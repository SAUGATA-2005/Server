const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  photo: { type: String },
  menu: [menuItemSchema],
  contact: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tables: { type: Number, required: true }  // 👈 add this
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
