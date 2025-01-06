// routes/secretariaRoutes.js
const express = require('express');
const secretariaController = require('../controllers/secretariaController');
const router = express.Router();

router.post('/create', secretariaController.create);     
router.delete('/borrar/:name', secretariaController.deleteByName);
router.get('/buscar/:email', secretariaController.findByEmail);
router.get('/getAll', secretariaController.getAll);
router.put('/updateById/:id', secretariaController.actualizarSecretaria);
router.get('/buscarId/:id', secretariaController.findById);

module.exports = router;
