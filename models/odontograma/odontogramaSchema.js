const mongoose = require('mongoose');

const dienteSchema = new mongoose.Schema({
  numeroDiente: {
    type: Number,
    required: [true, 'El número de diente es obligatorio'],
    validate: {
      validator: function(v) {
        return v >= 11 && v <= 48;
      },
      message: 'Número de diente inválido'
    }
  },
  superficie: {
    type: String,
    required: [true, 'La superficie es obligatoria'],
    enum: ['superior', 'inferior', 'izquierda', 'derecha', 'central']
  },
  tratamiento: {
    type: String,
    required: [true, 'El tratamiento es obligatorio'],
    enum: [
      'Caries para hacer', 'Arreglo hecho', 'Caries filtrada', 
      'Por fuera', 'TC para hacer', 'TC hecho',
      'Corona para hacer', 'Corona hecha', 'Extracción para hacer',
      'Extracción hecha', 'Implante para hacer', 'Implante hecho'
    ]
  },
  notas: String
});

const odontogramaSchema = new mongoose.Schema({
  idPaciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: [true, 'El ID del paciente es obligatorio']
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  dientes: [dienteSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Odontograma', odontogramaSchema);