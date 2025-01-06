const express = require("express");
const medicoController = require("../controllers/medicoController");
const medicoRouter = express.Router();

// Ruta para crear un nuevo médico
medicoRouter.route("/create").post(medicoController.addMedico);

// Ruta para buscar un médico por email
medicoRouter.route("/findByEmail/:email").get(medicoController.findByEmail);

// Ruta para buscar un médico por nombre
medicoRouter.route("/findByName/:nombre").get(medicoController.findByName);

// Ruta para buscar un médico por usuario
medicoRouter.route("/findByUser/:user").get(medicoController.findByUser);

// Ruta para buscar un médico por ID
medicoRouter.route("/findById/:id").get(medicoController.findById);

// Ruta para buscar médicos por especialidad
medicoRouter.route("/findByEspecialidad/:especialidad").get(medicoController.findByEspecialidad);

// Ruta para buscar un médico por matrícula
medicoRouter.route("/findByMatricula/:nMatricula").get(medicoController.findByMatricula);

// Ruta para eliminar un médico por usuario
medicoRouter.route("/deleteById/:Id").delete(medicoController.deleteById);

// Ruta para obtener todos los médicos
medicoRouter.route("/").get(medicoController.getAllMedicos); 

// Ruta para actualizar un médico por Id
medicoRouter.route("/updateById/:id").put(medicoController.actualizarMedico);

module.exports = medicoRouter;
