const OdontogramaLogic = require("../logic/odontogramaLogic");

const createOdontograma = async (req, res) => {
  try {
    // Validar datos requeridos
    if (!req.body.idPaciente || !req.body.dientes || !Array.isArray(req.body.dientes)) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Datos incompletos o inválidos' 
      });
    }

    const odontograma = await OdontogramaLogic.create(req);
    res.status(200).json(odontograma);
  } catch (err) {
    console.error('Error en createOdontograma:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getByPatientId = async (req, res) => {
  try {
    const odontogramas = await OdontogramaLogic.getByPatientId(req.params.patientId);
    res.status(200).json(odontogramas);
  } catch (err) {
    console.error('Error en getByPatientId:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteOdontograma = async (req, res) => {
  try {
    const deleted = await OdontogramaLogic.deleteById(req.params.id);
    res.status(200).json({ 
      status: 'success', 
      message: 'Odontograma eliminado', 
      odontograma: deleted 
    });
  } catch (err) {
    console.error('Error en deleteOdontograma:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteAllByPatient = async (req, res) => {
    try {
      const deleted = await OdontogramaLogic.deleteAllByPatientId(req.params.patientId);
      res.status(200).json({
        status: 'success',
        message: 'Odontogramas eliminados',
        result: deleted
      });
    } catch (err) {
      console.error('Error en deleteAllByPatient:', err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  };

module.exports = {
  createOdontograma,
  getByPatientId,
  deleteOdontograma,
  deleteAllByPatient
};