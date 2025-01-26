const Odontograma = require("../models/odontograma/odontogramaSchema");

async function create(request) {
    try {
      const { idPaciente, dientes } = request.body;
      
      // Remove the origen override mapping
      const newOdontograma = new Odontograma({
        idPaciente,
        dientes
      });
  
      return await newOdontograma.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function deleteAllByPatientId(patientId) {
    try {
      const result = await Odontograma.deleteMany({ idPaciente: patientId });
      if (result.deletedCount === 0) {
        throw new Error('No se encontraron odontogramas para eliminar');
      }
      return result;
    } catch (error) {
      throw new Error(`Error al eliminar odontogramas: ${error.message}`);
    }
  }

async function getByPatientId(patientId) {
  try {
    return await Odontograma.find({ idPaciente: patientId })
      .sort({ fecha: -1 });
  } catch (error) {
    throw new Error(`Error al obtener odontograma: ${error.message}`);
  }
}

async function deleteById(id) {
  try {
    const deletedOdontograma = await Odontograma.findByIdAndDelete(id);
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
  deleteById,
  deleteAllByPatientId
};