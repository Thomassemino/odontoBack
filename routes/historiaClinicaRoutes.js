const express = require("express");
const historiaClinicaController = require("../controllers/historiaClinicaController");
const historiaClinicaRouter = express.Router();

// Ruta para crear una nueva historia clínica
historiaClinicaRouter.route("/create").post(historiaClinicaController.create);

// Ruta para eliminar una historia clínica
historiaClinicaRouter.route("/deleteHc/:id").delete(historiaClinicaController.deleteHc);   

// Ruta para actualizar una historia clínica
historiaClinicaRouter.route("/updateHc/:id").put(historiaClinicaController.updateHc);

// Ruta para obtener una historia clínica
historiaClinicaRouter.route("/getHc/:id").get(historiaClinicaController.getHc);

module.exports = historiaClinicaRouter;
