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
    { 
      ...datosActualizables,
      fechaModificacion: new Date()
    }, 
    { new: true }
  ).populate('tratamientoId');
};

const eliminarPrestacion = async (id, odontologoId) => {
  return await Prestaciones.findByIdAndUpdate(
    id,
    {
      eliminado: true,
      eliminadoPor: odontologoId,
      fechaEliminacion: new Date()
    },
    { new: true }
  );
};

const obtenerPrestacionesPorPaciente = async (pacienteId) => {
  return await Prestaciones.find({ 
    pacienteId,
    eliminado: { $ne: true }
  })
    .populate('tratamientoId')
    .sort({ createdAt: -1 });
};

const agregarPago = async (prestacionId, datosPago) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(prestacionId)) {
      throw new Error('ID de prestación inválido');
    }

    if (!datosPago.monto || datosPago.monto <= 0) {
      throw new Error('El monto del pago debe ser mayor a 0');
    }

    if (!datosPago.fecha) {
      datosPago.fecha = new Date();
    }

    const prestacionActualizada = await Prestaciones.findOneAndUpdate(
      { _id: prestacionId },
      { $push: { pagos: datosPago } },
      { 
        new: true,
        runValidators: true,
        populate: 'tratamientoId'
      }
    );

    if (!prestacionActualizada) {
      throw new Error('Prestación no encontrada');
    }

    return prestacionActualizada;
  } catch (error) {
    console.error('Error en agregarPago:', error);
    throw error;
  }
};

const editarPago = async (prestacionId, pagoId, datosPago) => {
  try {
    const prestacion = await Prestaciones.findById(prestacionId);
    if (!prestacion) {
      throw new Error('Prestación no encontrada');
    }

    const pago = prestacion.pagos.id(pagoId);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }

    pago.monto = datosPago.monto;
    pago.fecha = datosPago.fecha;
    pago.editadoPor = datosPago.odontologoId;
    pago.fechaEdicion = new Date();

    await prestacion.save();
    return prestacion;
  } catch (error) {
    console.error('Error en editarPago:', error);
    throw error;
  }
};

const eliminarPago = async (prestacionId, pagoId, odontologoId) => {
  try {
    const prestacion = await Prestaciones.findById(prestacionId);
    if (!prestacion) {
      throw new Error('Prestación no encontrada');
    }

    const pago = prestacion.pagos.id(pagoId);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }

    // Marcar el pago como eliminado
    pago.eliminado = true;
    pago.eliminadoPor = odontologoId;
    pago.fechaEliminacion = new Date();

    // Guardar los cambios
    const prestacionActualizada = await prestacion.save();
    
    // Retornar la prestación actualizada con el tratamiento poblado
    return await Prestaciones.findById(prestacionId).populate('tratamientoId');
  } catch (error) {
    console.error('Error en eliminarPago:', error);
    throw error;
  }
};

const obtenerPagosPrestacion = async (prestacionId) => {
  const prestacion = await Prestaciones.findById(prestacionId);
  if (!prestacion) {
    throw new Error('Prestación no encontrada');
  }
  return prestacion.pagos.filter(pago => !pago.eliminado);
};

module.exports = {
  crearPrestacion,
  editarPrestacion,
  eliminarPrestacion,
  obtenerPrestacionesPorPaciente,
  agregarPago,
  editarPago,
  eliminarPago,
  obtenerPagosPrestacion
};