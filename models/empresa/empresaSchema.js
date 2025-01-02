// models/Empresa.js
const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre de la empresa es obligatorio'], 
    trim: true 
  },
  direccion: { 
    type: String, 
    required: [true, 'La dirección es obligatoria'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'], 
    unique: true, 
    lowercase: true,
    match: [/.+\@.+\..+/, 'Por favor, ingrese un email válido'] // Valida el formato de email
  },
  telefono: { 
    type: String, 
    required: [true, 'El número de teléfono es obligatorio'] 
  }
});

module.exports = mongoose.model('Empresa', empresaSchema);
