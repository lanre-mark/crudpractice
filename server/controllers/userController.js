const User = require('../models/User');

const loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.locals.msg = {
        status: 'user does not exist',
        id: null,
        username: null,
      };
    } else {
      if (user.password === req.body.password) {
        res.locals.msg = {
          status: 'successful',
          id: user._id,
          username: user.username,
        };
      } else {
        res.locals.msg = { status: 'wrong password', id: null, username: null };
      }
    }
    return next();
  } catch (err) {
    return next({ error: err });
  }
};

module.exports = {
  loginUser,
};
