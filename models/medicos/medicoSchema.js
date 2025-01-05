const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,                                    
    lowercase: true,
    match: [/^[a-zA-ZáéíóúÁÉÍÓÚüÜàèìòùÀÈÌÒÙ\s]+$/, 'Por favor ingresa un nombre válido que solo contenga letras y espacios']
  },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'],    
    unique: true,                                  
    match: [/.+\@.+\..+/, 'Por favor ingresa un email válido'],  
    lowercase: true                                
  },
  especialidad: { 
    type: String, 
    required: [true, 'La especialidad es obligatoria'], 
    lowercase: true                                
  },
  celular: { 
    type: String, // Cambiado a String para manejar correctamente números de teléfono
    required: [true, 'El número de celular es obligatorio']  
  },
  nMatricula: { 
    type: String, 
    required: [true, 'El número de matrícula es obligatorio'], 
    unique: true,                                              
    trim: true,                                               
    default: 'no especificado'                                 
  },
  clave: { 
    type: String, 
    required: [true, 'La creacion de una clave es obligatoria'],
    trim: true,                                               
    match: [/^[a-zA-Z0-9]+$/, 'La clave solo puede contener letras y números, sin espacios ni símbolos']                          
  }
});

module.exports = mongoose.model('Medico', medicoSchema);
