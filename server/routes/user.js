const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/login', userController.loginUser, (req, res) => {
  console.log('req body', req.body);
  return res.status(200).send('Login Successful');
});

module.exports = router;
