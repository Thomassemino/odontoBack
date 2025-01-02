// controllers/empresaController.js
const empresaService = require('../logic/empresaLogic');

async function crearEmpresa(req, res) {
  try {
    const empresa = await empresaService.crearEmpresa(req.body);
    res.status(201).json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la empresa', detalle: error.message });
  }
}

async function actualizarEmpresa(req, res) {
  try {
    const { id } = req.params;
    const empresa = await empresaService.actualizarEmpresa(id, req.body);
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la empresa', detalle: error.message });
  }
}

async function obtenerEmpresa(req, res) {
  try {
    const empresa = await empresaService.obtenerEmpresa();
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la empresa', detalle: error.message });
  }
}

module.exports = {
  crearEmpresa,
  actualizarEmpresa,
  obtenerEmpresa
};
