const prestacionesService = require('../logic/prestacionesLogic');

// Crear prestación
const crearPrestacion = async (req, res) => {
  try {
    const nuevaPrestacion = await prestacionesService.crearPrestacion(req.body);
    res.status(201).json(nuevaPrestacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar prestación
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

// Eliminar prestación
const eliminarPrestacion = async (req, res) => {
  const { id } = req.params;
  try {
    const prestacionEliminada = await prestacionesService.eliminarPrestacion(id);
    if (!prestacionEliminada) {
      return res.status(404).json({ error: 'Prestación no encontrada' });
    }
    res.status(200).json({ message: 'Prestación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener prestaciones por paciente
const obtenerPrestacionesPorPaciente = async (req, res) => {
  const { pacienteId } = req.params;
  try {
    const prestaciones = await prestacionesService.obtenerPrestacionesPorPaciente(pacienteId);
    res.status(200).json(prestaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  crearPrestacion,
  editarPrestacion,
  eliminarPrestacion,
  obtenerPrestacionesPorPaciente,
};
