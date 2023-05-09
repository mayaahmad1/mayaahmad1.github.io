const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    subscription: String,
});

UserSchema.methods.generateAuthToken = function(){
  const userData = this;
  const token = jwt.sign({ id: userData._id, name: userData.name, email: userData.email }, 'this782346is23786a238746very9267534long23786secret');
  return token;
}
const User = mongoose.model('User', UserSchema);

module.exports = User;
