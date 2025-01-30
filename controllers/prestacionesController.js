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
    const prestacionActualizada = await prestacionesService.editarPrestacion(id, {
      ...req.body,
      modificadoPor: req.body.modificadoPor,
      nombreModificador: req.body.nombreModificador
    });
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
      odontologoId: req.body.odontologoId || 'Sistema',
      nombreOdontologo: req.body.nombreOdontologo || 'Sistema'
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
    console.log('Datos recibidos para edición:', req.body);
    
    // Asegurarse de que tenemos todos los campos requeridos
    const datosPago = {
      monto: parseFloat(req.body.monto),
      fecha: new Date(req.body.fecha),
      odontologoId: req.body.odontologoId,
      nombreOdontologo: req.body.nombreOdontologo,
      editadoPor: req.body.editadoPor || req.body.odontologoId,
      nombreEditor: req.body.nombreEditor || req.body.nombreOdontologo,
      fechaEdicion: new Date()
    };

    // Validar que tenemos los campos requeridos
    if (!datosPago.nombreOdontologo || !datosPago.odontologoId) {
      throw new Error('Faltan datos requeridos del odontólogo');
    }

    console.log('Datos procesados para edición:', datosPago);
    
    const prestacionActualizada = await prestacionesService.editarPago(id, pagoId, datosPago);
    res.status(200).json(prestacionActualizada);
  } catch (error) {
    console.error('Error en controlador editarPago:', error);
    res.status(400).json({ 
      error: `Error al editar el pago: ${error.message}`,
      details: error.stack
    });
  }
};

const eliminarPago = async (req, res) => {
  const { id, pagoId } = req.params;
  const { eliminadoPor, nombreEliminador } = req.body;

  try {
    const prestacionActualizada = await prestacionesService.eliminarPago(
      id, 
      pagoId, 
      eliminadoPor || 'Sistema',
      nombreEliminador || 'Sistema'
    );
    
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