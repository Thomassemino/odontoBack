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
    enum: ['superior', 'inferior', 'izquierda', 'derecha', 'central', 'completo']
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
  origen: {
    type: String,
    required: true,
    enum: ['propio', 'otro'],
    default: 'propio'
  },
  notas: String
});