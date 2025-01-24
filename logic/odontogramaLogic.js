const Odontograma = require('../models/odontograma/odontogramaSchema');
async function createOdontograma(data) {
  return await Odontograma.create(data);
}
async function getOdontogramaByPatientId(patientId) {
  return await Odontograma.find({idPaciente: patientId}).populate('dientes');  
}
module.exports = {createOdontograma, getOdontogramaByPatientId};