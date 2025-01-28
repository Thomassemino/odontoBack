const Tratamiento = require('../models/tratamientos/tratamientosSchema');
const tratamientoLogic = require('../logic/tratamientoLogic');

// Crear un nuevo tratamiento
const crearTratamiento = async (req, res) => {
  try {
    const { nombre, descripcion, monto = 0 } = req.body;
    
    // Validar que los campos requeridos estén presentes
    if (!nombre || !descripcion) {
      return res.status(400).json({ message: 'Nombre y Descripción son requeridos' });
    }

    // Usar la lógica para crear el tratamiento
    const tratamiento = await tratamientoLogic.crearTratamientoLogic(nombre, descripcion, monto);

    res.status(201).json({ message: 'Tratamiento creado exitosamente', tratamiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear tratamiento', error });
  }
};

// Obtener todos los tratamientos
const obtenerTratamientos = async (req, res) => {
  try {
    const tratamientos = await tratamientoLogic.obtenerTratamientosLogic();
    res.status(200).json(tratamientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tratamientos', error });
  }
};

// Obtener un tratamiento por su ID
const obtenerTratamientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tratamiento = await tratamientoLogic.obtenerTratamientoPorIdLogic(id);

    if (!tratamiento) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.status(200).json(tratamiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tratamiento', error });
  }
};

// Actualizar un tratamiento
const actualizarTratamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, monto = 0 } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !descripcion) {
      return res.status(400).json({ message: 'Nombre y Descripción son requeridos' });
    }

    // Usar la lógica para actualizar el tratamiento
    const tratamientoActualizado = await tratamientoLogic.actualizarTratamientoLogic(id, nombre, descripcion, monto);

    if (!tratamientoActualizado) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.status(200).json({ message: 'Tratamiento actualizado exitosamente', tratamiento: tratamientoActualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar tratamiento', error });
  }
};

// Eliminar un tratamiento
const eliminarTratamiento = async (req, res) => {
  try {
    const { id } = req.params;

    // Usar la lógica para eliminar el tratamiento
    const tratamientoEliminado = await tratamientoLogic.eliminarTratamientoLogic(id);

    if (!tratamientoEliminado) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.status(200).json({ message: 'Tratamiento eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar tratamiento', error });
  }
};

module.exports = {
  crearTratamiento,
  obtenerTratamientos,
  obtenerTratamientoPorId,
  actualizarTratamiento,
  eliminarTratamiento,
};