const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  const decode = token && jwt.decode(token);
  if(decode){
    req.isAdmin = true;
    req.decode_data = decode;
    next();
  }else{
    req.isAdmin = false;
    next();
  }
}

module.exports = isAdmin;