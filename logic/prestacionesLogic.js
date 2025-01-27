const Prestaciones = require('../models/prestaciones/prestacionesSchema');
const mongoose = require('mongoose');

const crearPrestacion = async (data) => {
  const nuevaPrestacion = new Prestaciones(data);
  return await nuevaPrestacion.save();
};

const editarPrestacion = async (id, data) => {
  // Asegurarse de que no se puedan editar los pagos directamente
  const { pagos, ...datosActualizables } = data;
  return await Prestaciones.findByIdAndUpdate(
    id, 
    datosActualizables, 
    { new: true }
  ).populate('tratamientoId');
};

const eliminarPrestacion = async (id) => {
  return await Prestaciones.findByIdAndDelete(id);
};

const obtenerPrestacionesPorPaciente = async (pacienteId) => {
  return await Prestaciones.find({ pacienteId })
    .populate('tratamientoId')
    .sort({ createdAt: -1 });
};

const agregarPago = async (prestacionId, datosPago) => {
  const prestacion = await Prestaciones.findById(prestacionId);
  if (!prestacion) {
    throw new Error('Prestación no encontrada');
  }

  prestacion.pagos.push(datosPago);
  return await prestacion.save();
};

const obtenerPagosPrestacion = async (prestacionId) => {
  const prestacion = await Prestaciones.findById(prestacionId);
  if (!prestacion) {
    throw new Error('Prestación no encontrada');
  }
  return prestacion.pagos;
};

module.exports = {
  crearPrestacion,
  editarPrestacion,
  eliminarPrestacion,
  obtenerPrestacionesPorPaciente,
  agregarPago,
  obtenerPagosPrestacion
};