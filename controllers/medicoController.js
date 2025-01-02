const MedicoLogic = require("../logic/medicoLogic");


const addMedico = async (req, res) => {
    try {
        const medico = await MedicoLogic.create(req);
        res.status(200).json({ medico: medico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un médico por email
const findByEmail = async (req, res) => {
    try {
        const medico = await MedicoLogic.findByEmail(req);
        if (!medico) {
            return res.status(404).json({ status: 'error', message: 'Médico no encontrado' });
        }
        res.status(200).json({ medico: medico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un médico por nombre
const findByName = async (req, res) => {
    try {
        const medico = await MedicoLogic.findByName(req);
        if (!medico) {
            return res.status(404).json({ status: 'error', message: 'Médico no encontrado' });
        }
        res.status(200).json({ medico: medico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un médico por usuario
const findByUser = async (req, res) => {
    try {
        const medico = await MedicoLogic.findByUser(req);
        if (!medico) {
            return res.status(404).json({ status: 'error', message: 'Médico no encontrado' });
        }
        res.status(200).json({ medico: medico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar médicos por especialidad
const findByEspecialidad = async (req, res) => {
    try {
        const medicos = await MedicoLogic.findByEspecialidad(req);
        if (medicos.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No se encontraron médicos en esta especialidad' });
        }
        res.status(200).json({ medicos: medicos });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un médico por matrícula
const findByMatricula = async (req, res) => {
    try {
        const medico = await MedicoLogic.findByMatricula(req);
        if (!medico) {
            return res.status(404).json({ status: 'error', message: 'Médico no encontrado' });
        }
        res.status(200).json({ medico: medico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para eliminar un médico por usuario
const deleteByUser = async (req, res) => {
    try {
        const deletedMedico = await MedicoLogic.deleteByUser(req);
        res.status(200).json({ status: 'success', message: 'Médico eliminado', medico: deletedMedico });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getAllMedicos = async (req, res) => {
    try {
        const medicos = await MedicoLogic.getAllMedicos();
        res.status(200).json({ medicos: medicos });
    } catch (err) {
        console.log(err);
        res.send({ status: 'error', message: err.message });
    }
}
async function actualizarMedico(req, res) {
    try {
      const { id } = req.params;
      const medico = await MedicoLogic.actualizarMedico(id, req.body);
      res.status(200).json(empresa);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar al medico', detalle: error.message });
    }
  }

module.exports = {
    addMedico,
    findByEmail,
    findByName,
    findByUser,
    findByEspecialidad,
    findByMatricula,
    deleteByUser,
    getAllMedicos,
    actualizarMedico
};
