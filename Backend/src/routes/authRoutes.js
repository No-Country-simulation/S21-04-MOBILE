const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.delete('/:id', authController.deleteUser);
router.post('/verify-token', authController.verifyToken);

module.exports = router;
