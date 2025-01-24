const odontogramaLogic = require('../logic/odontogramaLogic');
async function createOdontograma(req, res) {    
  const odontograma = await odontogramaLogic.createOdontograma(req.body);
  res.status(201).json(odontograma);
}
async function getOdontogramaByPatientId(req, res) {
  const odontogramas = await odontogramaLogic.getOdontogramaByPatientId(req.params.patientId);
  res.json(odontogramas);
}
module.exports = {createOdontograma, getOdontogramaByPatientId};