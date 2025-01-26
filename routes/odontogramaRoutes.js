const express = require('express');
const odontogramaController = require('../controllers/odontogramaController'); 
const router = express.Router();


router.post('/odontograma', odontogramaController.create);
router.get('/odontograma/patient/:patientId', odontogramaController.findByPatientId);

module.exports = router;