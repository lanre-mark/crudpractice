const User = require('../models/User');

const loginUser = (req, res, next) => {
  console.log('req body in controller===', req.body);
  return next();
};

module.exports = {
  loginUser,
};
