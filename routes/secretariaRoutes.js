// routes/secretariaRoutes.js
const express = require('express');
const secretariaController = require('../controllers/secretariaController');
const router = express.Router();

router.post('/create', secretariaController.create);     
router.delete('/borrar/:nombre', secretariaController.deleteByName);
router.get('/buscar/:nombre', secretariaController.findByName);
router.put('/updateById/:id', secretariaController.actualizarSecretaria);

module.exports = router;
