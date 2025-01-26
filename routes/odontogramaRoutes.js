const express = require("express");
const odontogramaController = require("../controllers/odontogramaController");
const odontogramaRouter = express.Router();

odontogramaRouter.route("/")
  .post(odontogramaController.createOdontograma);

odontogramaRouter.route("/patient/:patientId")
  .get(odontogramaController.getByPatientId);

odontogramaRouter.route("/:id")
  .delete(odontogramaController.deleteOdontograma);

module.exports = odontogramaRouter;