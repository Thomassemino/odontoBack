const Prestaciones = require('../models/prestaciones/prestacionesSchema');


const crearPrestacion = async (data) => {
  const nuevaPrestacion = new Prestaciones(data);
  return await nuevaPrestacion.save();
};

const editarPrestacion = async (id, data) => {
  return await Prestaciones.findByIdAndUpdate(id, data, { new: true });
};


const eliminarPrestacion = async (id) => {
  return await Prestaciones.findByIdAndDelete(id);
};

const obtenerPrestacionesPorPaciente = async (pacienteId) => {
  return await Prestaciones.find({ pacienteId }).populate('pacienteId');
};

module.exports = {
  crearPrestacion,
  editarPrestacion,
  eliminarPrestacion,
  obtenerPrestacionesPorPaciente,
};
