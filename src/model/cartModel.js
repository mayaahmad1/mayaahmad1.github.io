const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  price: Number
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;