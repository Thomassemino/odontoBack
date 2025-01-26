const express = require("express");
const odontogramaController = require("../controllers/odontogramaController");
const odontogramaRouter = express.Router();

odontogramaRouter.route("/")
  .post(odontogramaController.createOdontograma);

odontogramaRouter.route("/patient/:patientId")
  .get(odontogramaController.getByPatientId)
  .delete(odontogramaController.deleteAllByPatient);

odontogramaRouter.route("/:id")
  .delete(odontogramaController.deleteOdontograma);

module.exports = odontogramaRouter;