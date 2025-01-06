const express = require("express");
const pacienteController = require("../controllers/pacienteController");
const pacienteRouter = express.Router();

// Ruta para crear un nuevo paciente
pacienteRouter.route("/create").post(pacienteController.addPaciente);

// Ruta para buscar un paciente por nombre
pacienteRouter.route("/findByName/:nombre").get(pacienteController.findByName);

// Ruta para buscar un paciente por Dni
pacienteRouter.route("/findByDni/:dni").get(pacienteController.findByDni);

// Ruta para buscar un paciente por Dni
pacienteRouter.route("/findById/:Id").get(pacienteController.findById);

// Ruta para actualizar un paciente por Id
pacienteRouter.route("/updateById/:id").put(pacienteController.actualizarPaciente);


// Ruta para eliminar un paciente por id
pacienteRouter.route("/deleteById/:Id").delete(pacienteController.deleteById);

// Ruta para obtener todos los pacientes
pacienteRouter.route("/").get(pacienteController.getAll);


module.exports = pacienteRouter;

