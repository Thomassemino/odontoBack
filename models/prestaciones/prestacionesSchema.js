const mongoose = require('mongoose');
const prestacionesSchema = new mongoose.Schema({
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: [true, 'El ID del paciente es obligatorio']
  },
  precio: {
    type: Number, 
    required: true, 
    default: 0, 
    message: 'El precio es obligatorio'
  },
  descripcion: {
    type: String, 
    required: true
  },
  pagado: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('Prestaciones', prestacionesSchema);