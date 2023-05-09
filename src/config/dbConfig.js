const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://m0nst3r:m0nst3r@cluster0.luynrqo.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

module.exports = db;

