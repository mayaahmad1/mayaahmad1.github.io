const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
  product_id: String,
  name: String,
  price: Number
});

const CheckoutSchema = new mongoose.Schema({
  user_id: String,
  total_item : Number,
  total_price: Number,
  items: [ItemsSchema],
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String,
  payment_method: String,
  card_name: String,
  card_number: String,
  card_exp: String,
  card_cvv: String,
});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout;