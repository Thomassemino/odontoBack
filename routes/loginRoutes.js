// routes/citaRoutes.js
const express = require('express');
const loginController = require('../controllers/usuarioController');
const loginRouter = express.Router();



loginRouter.post('/registro', loginController.create);
loginRouter.post('/login', loginController.login);
loginRouter.post('/recuperar-contrasena', loginController.recuperarPassword);
loginRouter.post('/cambiar-contrasena', loginController.cambiarPassword);
loginRouter.patch('/actualizar-contraseña/:id', loginController.actualizarContraseña);
module.exports = loginRouter;
