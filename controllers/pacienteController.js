const PacienteLogic = require("../logic/pacienteLogic");
const CitaSchema = require("../models/cita/citaSchema");
// Controlador para agregar un nuevo paciente
const addPaciente = async (req, res) => {
    try {
        const paciente = await PacienteLogic.create(req);
        res.status(200).json({ paciente: paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un Paciente por nombre
const findByName = async (req, res) => {
    //console.log(req.params);
    try {
        const paciente = await PacienteLogic.findByName(req);
        if (!paciente) {
            return res.status(404).json({ status: 'error', message: 'Paceinte no encontrado' });
        }
        res.status(200).json({ paciente: paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar un paciente por Dni
const findByDni = async (req, res) => {
    try {
        const paciente = await PacienteLogic.findByDni(req);
        if (!paciente) {
            return res.status(404).json({ status: 'error', message: 'Paciente no encontrado' });
        }
        res.status(200).json({ paciente: paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};


const findById = async (req, res) => {
    try {
        const paciente = await PacienteLogic.findById(req);
        if (!paciente) {
            return res.status(404).json({ status: 'error', message: 'Paciente no encontrado' });
        }
        res.status(200).json({ paciente: paciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para eliminar un paciente por usuario
const deleteById = async (req, res) => {
    try {
        const pacienteId = req.params.Id;
        // Verificar si el paciente tiene alguna cita con estado distinto a 'completada'
        const citasPendientes = await CitaSchema.find({ pacienteId, estado: { $ne: 'completada' } });        if (citasPendientes.length > 0) {
            return res.status(400).json({ status: 'error', message: 'No se puede eliminar el paciente, tiene citas pendientes o en proceso.' });
        }
        const deletedPaciente = await PacienteLogic.deleteById(req);
        res.status(200).json({ status: 'success', message: 'Paciente eliminado', paciente: deletedPaciente });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getAll = async (req, res) => {
    try {
        const pacientes = await PacienteLogic.getAll();
        res.status(200).json({ pacientes: pacientes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};


async function actualizarPaciente(req, res) {
    try {
      const { id } = req.params;
      console.log(req.params);
      console.log(id);
      const paciente = await PacienteLogic.updateByID(id, req.body);
      res.status(200).json(paciente);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el paciente', detalle: error.message });
    }
  }

module.exports = {
    addPaciente,
    findByName,
    findByDni,
    findById,
    deleteById,
    getAll,
    actualizarPaciente
};
