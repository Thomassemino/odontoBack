const Tratamiento = require('../models/tratamientos/tratamientosSchema');

// Lógica para crear tratamiento
const crearTratamientoLogic = async (nombre, descripcion) => {
  const tratamiento = new Tratamiento({ nombre, descripcion });
  return await tratamiento.save();
};

// Lógica para obtener todos los tratamientos
const obtenerTratamientosLogic = async () => {
  return await Tratamiento.find();
};

// Lógica para obtener un tratamiento por ID
const obtenerTratamientoPorIdLogic = async (id) => {
  return await Tratamiento.findById(id);
};

// Lógica para actualizar tratamiento
const actualizarTratamientoLogic = async (id, nombre, descripcion) => {
  return await Tratamiento.findByIdAndUpdate(
    id,
    { nombre, descripcion },
    { new: true } // Devuelve el documento actualizado
  );
};

// Lógica para eliminar tratamiento
const eliminarTratamientoLogic = async (id) => {
  return await Tratamiento.findByIdAndDelete(id);
};

module.exports = {
  crearTratamientoLogic,
  obtenerTratamientosLogic,
  obtenerTratamientoPorIdLogic,
  actualizarTratamientoLogic,
  eliminarTratamientoLogic,
};
