const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:id', profileController.getProfile);
router.post('/', profileController.postProfile);
router.put('/:id', profileController.putProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;