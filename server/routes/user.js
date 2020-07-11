const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/login', userController.loginUser, (req, res) => {
  return res.status(200).send(res.locals.msg);
});

module.exports = router;
