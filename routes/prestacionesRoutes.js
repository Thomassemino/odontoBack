const express = require('express');
const router = express.Router();
const prestacionesController = require('../controllers/prestacionesController');

// Ruta para crear una prestación
router.post('/', prestacionesController.crearPrestacion);

// Ruta para editar una prestación
router.put('/:id', prestacionesController.editarPrestacion);

// Ruta para eliminar una prestación
router.delete('/:id', prestacionesController.eliminarPrestacion);

// Ruta para obtener todas las prestaciones de un paciente
router.get('/paciente/:pacienteId', prestacionesController.obtenerPrestacionesPorPaciente);

// Ruta para agregar un pago a una prestación
router.post('/:id/pagos', prestacionesController.agregarPago);

// Ruta para obtener los pagos de una prestación
router.get('/:id/pagos', prestacionesController.obtenerPagosPrestacion);

router.put('/:id/pagos/:pagoId', prestacionesController.editarPago);

router.delete('/:id/pagos/:pagoId', prestacionesController.eliminarPago);

module.exports = router;