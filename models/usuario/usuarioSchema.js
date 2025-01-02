const mongoose = require('mongoose');


const usuarioSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'],    
        unique: true,                                  
        match: [/.+\@.+\..+/, 'Por favor ingresa un formato de email válido'],  
        lowercase: true                                
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['secretaria', 'odontologo', 'admin']
    }
});


module.exports = mongoose.model('Usuario', usuarioSchema);