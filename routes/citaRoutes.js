// routes/citaRoutes.js
const express = require('express');
const citaController = require('../controllers/citaController');
const router = express.Router();

router.post('/create', citaController.crearCita);         // Crear cita
router.get('/todas', citaController.obtenerCitas);       // Obtener todas las citas
router.get('/mes', citaController.obtenerCitasPorMes);   // Obtener citas por mes
router.get('/hoy',citaController.getCitasHoy);          // Obtener citas de hoy
router.get('/:id', citaController.obtenerCitaPorId);     // Obtener cita por ID
router.put('/:id', citaController.actualizarCita);       // Actualizar cita
router.delete('/:id', citaController.eliminarCita);      // Eliminar cita
router.get('/fecha/:fecha', citaController.getCitasPorFecha);  // Obtener citas por fecha específica


module.exports = router;
