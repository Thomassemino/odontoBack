import mongoose from 'mongoose';

const PacienteSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date },
  telefono: { type: String },
  email: { type: String }
});

const DienteSchema = new mongoose.Schema({
  numeroDiente: { type: Number, required: true },
  superficie: { type: String, required: true },
  tratamiento: { type: String, required: true },
  notas: { type: String }
});

const OdontogramaSchema = new mongoose.Schema({
  idPaciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  fecha: { type: Date, default: Date.now },
  dientes: [DienteSchema]
});

export const Paciente = mongoose.model('Paciente', PacienteSchema);
export const Odontograma = mongoose.model('Odontograma', OdontogramaSchema);