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
  try {
    const { id } = req.params; // ID de la prestación
    const { monto, fecha, odontologoId, historial } = req.body;

    // Validar datos requeridos
    if (!monto || !fecha || !odontologoId) {
      return res.status(400).json({ 
        error: 'Faltan datos requeridos para el pago' 
      });
    }

    // Buscar la prestación
    const prestacion = await Prestacion.findById(id);
    if (!prestacion) {
      return res.status(404).json({ 
        error: 'Prestación no encontrada' 
      });
    }

    // Crear el nuevo pago con toda la información necesaria
    const nuevoPago = {
      monto,
      fecha,
      odontologoId,
      fechaCreacion: new Date(),
      estado: 'activo',
      // Agregar información de historial
      historial: [{
        tipo: 'Nuevo Pago',
        fecha: new Date(),
        usuario: odontologoId,
        detalle: `Pago registrado por ${formatearMoneda(monto)}`
      }]
    };

    // Agregar el pago a la prestación
    prestacion.pagos.push(nuevoPago);
    
    // Guardar la prestación actualizada
    await prestacion.save();

    // Devolver respuesta
    res.status(201).json({
      mensaje: 'Pago registrado correctamente',
      pago: nuevoPago
    });
  } catch (error) {
    console.error('Error al agregar pago:', error);
    res.status(500).json({ 
      error: 'Error al procesar el pago',
      detalle: error.message 
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
  const odontologoId = req.body.userId || 'Sistema'; // Extraemos directamente el ID

  try {
    const prestacionActualizada = await prestacionesService.eliminarPago(id, pagoId, odontologoId);
    if (!prestacionActualizada) {
      return res.status(404).json({ error: 'Prestación o pago no encontrado' });
    }
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    console.error('Error al eliminar pago:', error);
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