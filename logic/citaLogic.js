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

// Obtener citas por fecha
async function obtenerCitasPorFecha(fecha) {
  const fechaInicio = new Date(fecha.setHours(0, 0, 0, 0));
  const fechaFin = new Date(fecha.setHours(23, 59, 59, 999));

  return await Cita.find({
    fecha: {
      $gte: fechaInicio,
      $lte: fechaFin
    }
  })
  .populate('pacienteId', 'nombre telefono areaCode')
  .populate('medicoId', 'nombre')
  .populate('tratamientos', 'nombre')
  .sort({ fecha: 1 });
}

// Actualizar cita
async function actualizarCita(id, data) {
  return await Cita.findByIdAndUpdate(id, data, { new: true });
}

// Eliminar cita
async function eliminarCita(id) {
  return await Cita.findByIdAndDelete(id);
}

async function obtenerCitasPorPaciente(pacienteId) {
  return await Cita.find({ pacienteId })
    .populate('tratamientos')
    .sort({ fecha: -1 }); // Sort by most recent first
}

module.exports = {
  crearCita,
  obtenerCitas,
  obtenerCitaPorId,
  actualizarCita,
  eliminarCita,
  obtenerCitasPorFecha,
};
