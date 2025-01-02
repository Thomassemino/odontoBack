const mongoose = require('mongoose');

const secretariaSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    trim: true,    
    match: [/^[a-zA-Z\s]+$/, 'Por favor ingresa un nombre válido que solo contenga letras y espacios'],                            
    lowercase: true                                
  },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'],    
    unique: true,                                  
    match: [/.+\@.+\..+/, 'Por favor ingresa un formato de email válido'],  
    lowercase: true                                
  },
  celular: { 
    type: String,
    required: [true, 'El número de celular es obligatorio'],
    match: [/^\d+$/, 'Por favor ingresa un número de celular válido sin letras, símbolos ni espacios'],
  },
});

module.exports = mongoose.model('Secretaria', secretariaSchema);
