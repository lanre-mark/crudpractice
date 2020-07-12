const jwt = require('jsonwebtoken');

const tokenizeLogin = async (req, res, next) => {
  const { id, username } = res.locals.msg;
  const payload = {
    id,
    username,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });
  res.locals.ssid = token;
  res.cookie('ssid', token, { httpOnly: true, secure: true });
  return next();
};

const validateRequestToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  try {
    const validatedToken = await jwt.verify(token, process.env.JWT_KEY);
    if (validatedToken && validatedToken.exp) {
      if (Date.now() >= validatedToken.exp * 1000) {
        return next({ error: 'Please re-login' });
      }
      res.locals.userId = validatedToken.id;
      return next();
    } else {
      return next({ error: 'User could not be validated' });
    }
  } catch (err) {
    console.log('Toen verification error :: ', err);
    return next({ error: 'Please Log In' });
  }
};

module.exports = { tokenizeLogin, validateRequestToken };
