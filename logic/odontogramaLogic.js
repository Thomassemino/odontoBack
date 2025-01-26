const OdontogramaSchema = require("../models/odontograma/odontogramaSchema");

async function create(request) {
  try {
    const { idPaciente, dientes } = request.body;
    
    // Procesar cada diente para agregar el origen
    const dientesConOrigen = dientes.map(diente => ({
      ...diente,
      origen: diente.tratamiento.includes('hecho') ? 'propio' : 'otro'
    }));

    const newOdontograma = new OdontogramaSchema({
      idPaciente,
      dientes: dientesConOrigen
    });

    await newOdontograma.save();
    return newOdontograma;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getByPatientId(patientId) {
  try {
    return await OdontogramaSchema.find({ idPaciente: patientId })
      .sort({ fecha: -1 });
  } catch (error) {
    throw new Error(`Error al obtener odontograma: ${error.message}`);
  }
}

async function deleteById(id) {
  try {
    const deletedOdontograma = await OdontogramaSchema.findByIdAndDelete(id);
    if (!deletedOdontograma) {
      throw new Error('Odontograma no encontrado');
    }
    return deletedOdontograma;
  } catch (error) {
    throw new Error(`Error al eliminar odontograma: ${error.message}`);
  }
}

module.exports = {
  create,
  getByPatientId,
  deleteById
};