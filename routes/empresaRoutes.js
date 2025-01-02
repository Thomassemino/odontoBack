// routes/empresaRoutes.js
const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

// Ruta para crear la empresa
router.post('/empresa', empresaController.crearEmpresa);

// Ruta para actualizar la empresa
router.put('/empresa/:id', empresaController.actualizarEmpresa);

// Ruta para obtener la información de la empresa
router.get('/empresa', empresaController.obtenerEmpresa);

module.exports = router;
