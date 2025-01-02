const MedicoSchema = require("../models/medicos/medicoSchema");

async function create(request) {
  try {
    // Crear un nuevo medico
    const newMedico = new MedicoSchema({
      nombre: request.body.nombre,
      email: request.body.email,
      especialidad: request.body.especialidad,
      celular: request.body.celular,
      nMatricula: request.body.nMatricula
    });
    await newMedico.save();

    return newMedico;
  }
  catch (error) {
    throw new Error(error.message);    
  }
}

async function findByEmail(request) {
  return await MedicoSchema.findOne({ email: request.params.email });
}

async function findByName(request) {
    return await MedicoSchema.findOne({ nombre: request.params.nombre });
}

async function findByUser(request) {
    return await MedicoSchema.findOne({ user: request.params.user });
}


async function findByEspecialidad(request) {
    try {
        const medicos = await MedicoSchema.find({ especialidad: request.params.especialidad });
        return medicos;  // Retorna todos los médicos que coincidan con la especialidad
    } catch (error) {
        throw new Error(`Error al buscar médicos por especialidad: ${error.message}`);
    }
}

async function findByMatricula(request) {
    return await MedicoSchema.findOne({ nMatricula: request.params.nMatricula });
}

async function deleteByUser(request) {
    try {
        const deletedMedico = await MedicoSchema.findOneAndDelete({ usuario: request.params.usuario });
        if (!deletedMedico) {
            throw new Error('Médico no encontrado');
        }
        return deletedMedico; // Retorna el médico que fue eliminado
    } catch (error) {
        throw new Error(`Error al eliminar médico: ${error.message}`);
    }
}

async function getAllMedicos() {
  try {
      const medicos = await MedicoSchema.find({});
      return medicos;  // Retorna todos los médicos
  } catch (error) {
      throw new Error(`Error al obtener todos los médicos: ${error.message}`);
  }
}

async function actualizarMedico(id, data) {
  return await MedicoSchemaSchema.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  create,
  findByEmail,
  findByName,
  findByUser,
  findByEspecialidad,
  findByMatricula,
  deleteByUser,
  getAllMedicos,
  actualizarMedico
};
