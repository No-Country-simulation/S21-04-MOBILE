const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/:id', contactController.getProfile);
router.post('/', contactController.postProfile);
router.put('/:id', contactController.putProfile);
// router.delete('/', authController.verifyToken);

module.exports = router;