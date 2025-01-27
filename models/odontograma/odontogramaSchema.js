const mongoose = require('mongoose');

const dienteSchema = new mongoose.Schema({
  numeroDiente: {
    type: String,
    required: [true, 'El número de diente es obligatorio'],
    validate: {
      validator: function(v) {
        // Validar dientes permanentes (11-48)
        const permanentPattern = /^([1-4][1-8])$/;
        // Validar dientes temporales (51-85)
        const temporaryPattern = /^([5-8][1-5])$/;
        return permanentPattern.test(v) || temporaryPattern.test(v);
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
    enum: ['Caries', 'Arreglo', 'Extracción', 'P.D', 'Arreglo filtrado', 
           'T.C', 'Corona', 'Impl', 'A.M', 'Ortodoncia', "Protesis", "Corona filtrada"]
  },
  origen: {
    type: String,
    required: true,
    enum: ['propio', 'otro']
  },
  isPrimary: {
    type: Boolean,
    default: false
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