const SecretariaSchema = require("../models/secretaria/secretariaSchema");

async function create(request) {
  try {
    // Crear una nueva secretaria
    const newSecretaria = new SecretariaSchema({
      nombre: request.body.nombre,
      email: request.body.email,
      celular: request.body.celular,
    });
    await newSecretaria.save();

    return newSecretaria;
  }
  catch (error) {
    throw new Error(error.message);    
  }
}

async function findByName(request) {
  return await SecretariaSchema.findOne({ nombre: request.params.nombre });
}
async function deleteByName(request) {
    try {
        const deletedSecretaria = await SecretariaSchema.findOneAndDelete({ nombre: request.params.nombre });
        if (!deletedSecretaria) {
            throw new Error('Secretaria no encontrada');
        }
        return deletedSecretaria; // Retorna la secretaria que fue eliminado
    } catch (error) {
        throw new Error(`Error al eliminar secretaria: ${error.message}`);
    }
}

async function actualizarSecretaria(id, data) {
  return await SecretariaSchema.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
  create,
  deleteByName,
  findByName,
  actualizarSecretaria
};
