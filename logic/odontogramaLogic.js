const Odontograma = require('../models/odontograma/odontogramaSchema');
const Diente = require('../models/odontograma/dienteSchema');

async function createOdontograma(data) {
  // Primero crear los dientes
  const dientesCreados = await Promise.all(
    data.dientes.map(diente => Diente.create(diente))
  );

  // Crear el odontograma con las referencias a los dientes
  const odontogramaData = {
    idPaciente: data.idPaciente,
    dientes: dientesCreados.map(d => d._id)
  };

  return await Odontograma.create(odontogramaData);
}

async function getOdontogramaByPatientId(patientId) {
  return await Odontograma.find({ idPaciente: patientId })
    .populate('dientes')
    .sort('-fecha');
}

module.exports = { createOdontograma, getOdontogramaByPatientId };