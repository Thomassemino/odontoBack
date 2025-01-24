const mongoose = require('mongoose');

const atencionSchema = new mongoose.Schema({
    paciente: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paciente',
        required: [true, 'El paciente es obligatorio']
    },
    fecha: { 
        type: Date, 
        required: [true, 'La fecha es obligatoria']
    },
    notaDelDia: { 
        type: String, 
        required: [true, 'Es obligatorio escribir sobre lo realizado al paciente']
    },
    profesional: { 
        type: String, 
        required: [true, 'Es obligatorio el nombre del profesional que atendió al paciente']
    },
 });
 
module.exports = mongoose.model('Atencion', atencionSchema);