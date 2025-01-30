const Prestaciones = require('../models/prestaciones/prestacionesSchema');
const mongoose = require('mongoose');

const crearPrestacion = async (data) => {
  const nuevaPrestacion = new Prestaciones(data);
  return await nuevaPrestacion.save();
};

const editarPrestacion = async (id, data) => {
  const { pagos, ...datosActualizables } = data;
  return await Prestaciones.findByIdAndUpdate(
    id, 
    { 
      ...datosActualizables,
      fechaModificacion: new Date(),
      nombreModificador: data.nombreModificador // Incluir nombre del modificador
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

    const fechaPago = datosPago.fecha ? new Date(datosPago.fecha) : new Date();
    
    const nuevoPago = {
      monto: datosPago.monto,
      fecha: fechaPago,
      odontologoId: datosPago.odontologoId,
      nombreOdontologo: datosPago.nombreOdontologo, // Incluir nombre
      estado: 'activo'
    };

    const prestacionActualizada = await Prestaciones.findOneAndUpdate(
      { _id: prestacionId },
      { $push: { pagos: nuevoPago } },
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
    console.log('Editando pago con datos:', { prestacionId, pagoId, datosPago });

    const prestacion = await Prestaciones.findById(prestacionId);
    if (!prestacion) {
      throw new Error('Prestación no encontrada');
    }

    const pago = prestacion.pagos.id(pagoId);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }

    // Actualizar los campos del pago
    Object.assign(pago, {
      monto: datosPago.monto,
      fecha: new Date(datosPago.fecha),
      editadoPor: datosPago.editadoPor,
      nombreEditor: datosPago.nombreEditor,
      fechaEdicion: new Date()
    });

    // Guardar los cambios
    await prestacion.save();

    // Retornar la prestación actualizada con los tratamientos poblados
    return await Prestaciones.findById(prestacionId).populate('tratamientoId');
  } catch (error) {
    console.error('Error en editarPago:', error);
    throw new Error(`Error al editar el pago: ${error.message}`);
  }
};


const eliminarPago = async (prestacionId, pagoId, eliminadoPor, nombreEliminador) => {
  try {
    const prestacion = await Prestaciones.findById(prestacionId);
    if (!prestacion) {
      throw new Error('Prestación no encontrada');
    }

    const pago = prestacion.pagos.id(pagoId);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }

    pago.eliminado = true;
    pago.eliminadoPor = eliminadoPor;
    pago.nombreEliminador = nombreEliminador; // Incluir nombre del eliminador
    pago.fechaEliminacion = new Date();

    await prestacion.save();
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