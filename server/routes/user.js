const router = require('express').Router();

const userController = require('../controllers/userController');
const { tokenizeLogin } = require('../controllers/utility');

router.post('/login', userController.loginUser, tokenizeLogin, (req, res) => {
  res.locals.msg.id = res.locals.ssid;
  return res.status(200).send(res.locals.msg);
});

module.exports = router;
