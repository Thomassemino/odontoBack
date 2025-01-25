const express = require('express');
const odontogramaController = require('../controllers/odontogramaController'); 
const router = express.Router();


router.post('/api/odontograma', odontogramaController.createOdontograma);
router.get('/api/odontograma/patient/:patientId', odontogramaController.getOdontogramaByPatientId);

module.exports = router;