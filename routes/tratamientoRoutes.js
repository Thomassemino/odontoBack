const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamientoController');

// Ruta para crear tratamiento
router.post('/create', tratamientoController.crearTratamiento);

// Ruta para obtener todos los tratamientos
router.get('/', tratamientoController.obtenerTratamientos);

// Ruta para obtener un tratamiento por ID
router.get('/findById/:id', tratamientoController.obtenerTratamientoPorId);

// Ruta para actualizar un tratamiento
router.put('/updateById/:id', tratamientoController.actualizarTratamiento);

// Ruta para eliminar un tratamiento
router.delete('/deleteById/:id', tratamientoController.eliminarTratamiento);

module.exports = router;
