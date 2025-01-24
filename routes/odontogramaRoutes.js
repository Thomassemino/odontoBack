const express = require('express');
const odontogramaController = require('../controllers/odontogramaController'); 
const router = express.Router();
router.post('/', odontogramaController.createOdontograma);
router.get('/patient/:patientId', odontogramaController.getOdontogramaByPatientId);
module.exports = router;