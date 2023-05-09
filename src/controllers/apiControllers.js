const User = require("../model/userModel");

const doRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password
  });
  try {
    await user.save();
    res.cookie('usr_token', user.generateAuthToken(), { httpOnly: true });
    res.render('responseLayout', { message: "User registered successfully!", url: '/', urlText: 'Return to Homepage', isLogged: true });
  } catch (err) {
    res.render('responseLayout', { message: 'Error registering user! => ' + err, url: '/', urlText: 'Return to Homepage', isLogged: true });
  }
}

const doLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      throw new Error('This email is not registered');
    } else {
      if (user.password !== password) {
        throw new Error('Password is incorrect');
      }
    }

    res.cookie('usr_token', user.generateAuthToken(), { httpOnly: true });
    res.redirect('/');
  } catch (err) {
    res.render('responseLayout', { message: "User Credential Error!", url: '/login', urlText: 'Go to Login Page', isLogged: true });
  }
}


module.exports = {
  doRegister,
  doLogin
};