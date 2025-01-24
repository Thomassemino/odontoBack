const express = require('express');
const dienteController = require('../controllers/dienteController');
const router = express.Router();
router.post('/', dienteController.createDiente);
module.exports = router;