const Empresa = require('../models/empresa/empresaSchema');

async function crearEmpresa(data) {
  const nuevaEmpresa = new Empresa(data);
  return await nuevaEmpresa.save();
}

async function actualizarEmpresa(id, data) {
  return await Empresa.findByIdAndUpdate(id, data, { new: true });
}

async function obtenerEmpresa() {
  return await Empresa.findOne();
}

module.exports = {
  crearEmpresa,
  actualizarEmpresa,
  obtenerEmpresa
};
 