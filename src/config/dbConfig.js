const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://tala:tala123@se371.bmee7ls.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

module.exports = db;

