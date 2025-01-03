const mongoose = require('mongoose');
const Tratamientos = require('../tratamientos/tratamientosSchema');
const citaSchema = new mongoose.Schema({
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: [true, 'El ID del paciente es obligatorio']
  },
  medicoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Medico', 
    required: [true, 'El ID del médico es obligatorio']
  },
  fecha: { 
    type: Date, 
    default: Date.now
  },
  motivo: { 
    type: String, 
    required: [true, 'El motivo de la cita es obligatorio'], 
    trim: true 
  },
  estado: { 
    type: String, 
    enum: ['pendiente', 'completada', 'cancelada'], 
    default: 'pendiente' 
  },
  notas: { 
    type: String, 
    trim: true 
  },

  monto: {
    type: Number,
    default: 0
  },
  tratamientos: [Tratamientos.schema]
});

module.exports = mongoose.model('Cita', citaSchema);
