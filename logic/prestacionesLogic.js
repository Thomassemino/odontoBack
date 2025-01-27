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
  try {
    if (!mongoose.Types.ObjectId.isValid(prestacionId)) {
      throw new Error('ID de prestación inválido');
    }

    const prestacion = await Prestaciones.findById(prestacionId);
    if (!prestacion) {
      throw new Error('Prestación no encontrada');
    }

    // Validar datos del pago
    if (!datosPago.monto || datosPago.monto <= 0) {
      throw new Error('El monto del pago debe ser mayor a 0');
    }

    if (!datosPago.fecha) {
      datosPago.fecha = new Date();
    }

    prestacion.pagos.push(datosPago);
    const prestacionActualizada = await prestacion.save();

    // Poblar los datos necesarios antes de devolver
    return await Prestaciones.findById(prestacionActualizada._id)
      .populate('tratamientoId');
  } catch (error) {
    console.error('Error en agregarPago:', error);
    throw error;
  }
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