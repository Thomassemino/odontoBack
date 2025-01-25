const odontogramaLogic = require('../logic/odontogramaLogic');

async function createOdontograma(req, res) {    
  try {
    const odontograma = await odontogramaLogic.createOdontograma(req.body);
    res.status(201).json(odontograma);
  } catch (error) {
    console.error('Error creating odontograma:', error);
    res.status(500).json({ error: 'Error al crear el odontograma' });
  }
}

async function getOdontogramaByPatientId(req, res) {
  try {
    const odontogramas = await odontogramaLogic.getOdontogramaByPatientId(req.params.patientId);
    res.json(odontogramas);
  } catch (error) {
    console.error('Error getting odontograma:', error);
    res.status(500).json({ error: 'Error al obtener el odontograma' });
  }
}

module.exports = { createOdontograma, getOdontogramaByPatientId };