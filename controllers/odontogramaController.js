import { PacienteLogic, OdontogramaLogic } from './odontogramalogic.js';

export const PacienteController = {
  async create(req, res) {
    try {
      const paciente = await PacienteLogic.create(req.body);
      res.status(201).json(paciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findByDni(req, res) {
    try {
      const result = await PacienteLogic.findByDni(req.params.dni);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const paciente = await PacienteLogic.update(req.params.id, req.body);
      res.json(paciente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const OdontogramaController = {
  async create(req, res) {
    try {
      await OdontogramaLogic.validateTreatmentData(req.body);
      const odontograma = await OdontogramaLogic.create(req.body);
      res.status(201).json(odontograma);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findByPatientId(req, res) {
    try {
      const odontogramas = await OdontogramaLogic.findByPatientId(req.params.patientId);
      res.json(odontogramas);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
};