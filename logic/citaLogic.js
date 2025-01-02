const Cita = require('../models/cita/citaSchema');

// Crear una nueva cita
async function crearCita(data) {
  try {
    const cita = new Cita(data);
    return await cita.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

// Obtener todas las citas
async function obtenerCitas() {
  return await Cita.find()
    .populate('pacienteId', 'nombre') // Muestra el nombre del paciente
    .populate('medicoId', 'nombre');  // Muestra el nombre del médico
}

// Obtener cita por ID
async function obtenerCitaPorId(id) {
  return await Cita.findById(id)
    .populate('pacienteId', 'nombre')
    .populate('medicoId', 'nombre');
}



// Actualizar cita
async function actualizarCita(id, data) {
  return await Cita.findByIdAndUpdate(id, data, { new: true });
}

// Eliminar cita
async function eliminarCita(id) {
  return await Cita.findByIdAndDelete(id);
}

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita
};
