const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre completo es obligatorio'],  
    trim: true,                                      
    lowercase: true                                  
  },
  dni: { 
    type: String, 
    required: [true, 'El DNI es obligatorio'],      
    unique: [true, 'Ya existe un paciente con el DNI ingresado.'],
    validate: {
      validator: function(v) {
        return /^[0-9]{8}$/.test(v);
      },
      message: 'DNI debe contener 8 números'
    }
  },
  telefono: { 
    type: String, 
    required: [true, 'El teléfono es obligatorio'],
    validate: {
      validator: function(v) {
        return /^\d{6,14}$/.test(v);
      },
      message: 'Teléfono debe tener entre 6 y 14 dígitos'
    }
  },
  areaCode: {
    type: String,
    enum: ['+54', '+1'],
    default: '+54'
  },
  mail: { 
    type: String, 
    required: false, // Hacemos el campo opcional
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Solo validamos si hay un valor
        return v === '' || v === null || v === undefined || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Email inválido'
    }
  },
  historiaClinica: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HistoriaClinica'
  },
 }, 
 {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id; // Alias para _id
      delete ret._id;   // Elimina el campo original (opcional)
      delete ret.__v;   // Elimina el campo de versión interna
      return ret;
    }
  }
 });
 
module.exports = mongoose.model('Paciente', pacienteSchema);