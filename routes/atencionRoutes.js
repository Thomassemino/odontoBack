const express = require('express');
const router = express.Router();
const AtencionController = require('../controllers/atencionController');

router.post('/create', AtencionController.createAtencion);
router.get('/todas/:pacienteId', AtencionController.getAtencionesByPaciente);
router.get('/unica/:pacienteId/fecha/:fecha', AtencionController.getAtencionByPacienteAndDate);
router.put('/edit-atencion/:pacienteId/fecha/:fecha', AtencionController.updateAtencion);
router.delete('/delete-atencion/:pacienteId/fecha/:fecha', AtencionController.deleteAtencion);

module.exports = router;