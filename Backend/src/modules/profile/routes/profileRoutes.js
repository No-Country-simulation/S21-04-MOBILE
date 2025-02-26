const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:id', profileController.getProfile);
router.post('/', profileController.postProfile);
router.put('/:id', profileController.putProfile);
// router.delete('/', authController.verifyToken);

module.exports = router;