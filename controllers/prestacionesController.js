const prestacionesService = require('../logic/prestacionesLogic');

const crearPrestacion = async (req, res) => {
  try {
    const nuevaPrestacion = await prestacionesService.crearPrestacion(req.body);
    res.status(201).json(nuevaPrestacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editarPrestacion = async (req, res) => {
  const { id } = req.params;
  try {
    const prestacionActualizada = await prestacionesService.editarPrestacion(id, req.body);
    if (!prestacionActualizada) {
      return res.status(404).json({ error: 'Prestación no encontrada' });
    }
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarPrestacion = async (req, res) => {
  const { id } = req.params;
  const odontologoId = req.body.odontologoId || 'Sistema';
  try {
    const prestacionEliminada = await prestacionesService.eliminarPrestacion(id, odontologoId);
    if (!prestacionEliminada) {
      return res.status(404).json({ error: 'Prestación no encontrada' });
    }
    res.status(200).json({ message: 'Prestación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerPrestacionesPorPaciente = async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const prestaciones = await prestacionesService.obtenerPrestacionesPorPaciente(pacienteId);
    res.status(200).json(prestaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const agregarPago = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Recibiendo pago para prestación:', id);
    console.log('Datos del pago:', req.body);

    const prestacionActualizada = await prestacionesService.agregarPago(id, {
      monto: parseFloat(req.body.monto),
      fecha: new Date(req.body.fecha),
      odontologoId: req.body.odontologoId || 'Sistema'
    });

    console.log('Prestación actualizada:', prestacionActualizada);
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    console.error('Error en controlador agregarPago:', error);
    res.status(400).json({ 
      error: error.message || 'Error al registrar el pago',
      details: error.stack
    });
  }
};


const editarPago = async (req, res) => {
  const { id, pagoId } = req.params;
  try {
    const prestacionActualizada = await prestacionesService.editarPago(id, pagoId, {
      ...req.body,
      editadoPor: req.body.userId,
      fechaEdicion: new Date()
    });
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarPago = async (req, res) => {
  const { id, pagoId } = req.params;
  try {
    const prestacionActualizada = await prestacionesService.eliminarPago(id, pagoId, {
      eliminadoPor: req.body.userId,
      fechaEliminacion: new Date()
    });
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const obtenerPagosPrestacion = async (req, res) => {
  const { id } = req.params;
  try {
    const pagos = await prestacionesService.obtenerPagosPrestacion(id);
    res.status(200).json(pagos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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