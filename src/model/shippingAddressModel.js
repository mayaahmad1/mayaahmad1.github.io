const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema({
  user_id: String,
  address: String,
  city: String,
  state: String,
  zip: String
});

const ShippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema);

module.exports = ShippingAddress;