const jwt = require('jsonwebtoken');

const isLogged = (req, res, next) => {
  const token = req.cookies.usr_token;
  const decode = token && jwt.decode(token);
  if(decode){
    req.isLogged = true;
    req.decode_data = decode;
    next();
  }else{
    req.isLogged = false;
    next();
  }
}

module.exports = isLogged;