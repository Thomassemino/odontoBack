import { Paciente, Odontograma } from './odontogramaSchema.js';

export const PacienteLogic = {
  async create(pacienteData) {
    const paciente = new Paciente(pacienteData);
    return await paciente.save();
  },

  async findByDni(dni) {
    const paciente = await Paciente.findOne({ dni });
    if (!paciente) throw new Error('Paciente no encontrado');
    return { paciente };
  },

  async update(id, pacienteData) {
    return await Paciente.findByIdAndUpdate(id, pacienteData, { new: true });
  }
};

export const OdontogramaLogic = {
  async create(data) {
    const odontograma = new Odontograma(data);
    return await odontograma.save();
  },

  async findByPatientId(patientId) {
    return await Odontograma.find({ idPaciente: patientId }).sort({ fecha: -1 });
  },

  async validateTreatmentData(data) {
    if (!data.idPaciente || !data.dientes || !Array.isArray(data.dientes)) {
      throw new Error('Datos de tratamiento inválidos');
    }
    
    for (const diente of data.dientes) {
      if (!diente.numeroDiente || !diente.superficie || !diente.tratamiento) {
        throw new Error('Datos de diente incompletos');
      }
    }
  }
};