const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/:id', contactController.getContact);
router.post('/', contactController.postContact);
router.put('/:id', contactController.putContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;