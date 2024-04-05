const express = require('express');
const router = express.Router();
const userValidator = require('../validators/userValidator');
const authMiddleware = require('../middlewares/authMiddleware'); 
const { registerUser, loginUser } = require('../services/userService');

router.post('/register', userValidator.validateRegistration, registerUser);

router.post('/login', userValidator.validateLogin, loginUser);

router.get('/profile', authMiddleware.verifyToken, (req, res) => {
  const userId = req.user.userId;
});

module.exports = router;
