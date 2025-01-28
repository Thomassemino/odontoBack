const { get } = require("mongoose");
const PacienteSchema = require("../models/pacientes/pacienteSchema");
const CitasSchema = require("../models/cita/citaSchema");
async function create(request) {
  try {
    const { 
      nombre, 
      dni,
      mail,
      telefono,
      areaCode
    } = request.body;

    

    const newPaciente = new PacienteSchema({
      nombre, 
      dni,
      mail,
      telefono,
      areaCode
    });

    await newPaciente.save();
    return newPaciente;
  }
  catch (error) {
    throw new Error(error.message);    
  }
}

async function findByName(request) {
    return await PacienteSchema.findOne({ nombre: request.params.nombre });
}

async function findByDni(request) {
    return await PacienteSchema.findOne({ dni: request.params.dni });
}

async function findById(request) {
  return await PacienteSchema.findById(request.params.Id);
}

async function updateByID(id, updateData) {
  return await PacienteSchema.findByIdAndUpdate(id, updateData, {
    new: true, // Devuelve el documento actualizado
    runValidators: true // Aplica las validaciones definidas en el esquema
  });
}

async function deleteById(request) {
  try {
      const pacienteBorrado = await PacienteSchema.findByIdAndDelete(request.params.Id);
      if (!pacienteBorrado) {
          throw new Error('Paciente no encontrado');
      }
      return pacienteBorrado; 
  } catch (error) {
      throw new Error(`Error al eliminar paciente: ${error.message}`);
  }
}

async function getAll() {
      try {
          const pacientes = await PacienteSchema.find({});
          return pacientes;  // Retorna todos los pacientes
      } catch (error) {
          throw new Error(`Error al obtener todos los pacientes: ${error.message}`);
      }
}

module.exports = {
  create,
  findByName,
  updateByID,
  deleteById,
  findByDni,
  getAll,
  findById
};
