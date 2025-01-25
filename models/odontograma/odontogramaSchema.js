const mongoose = require('mongoose');
const odontogramaSchema = new mongoose.Schema({
  idPaciente: {type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true},
  fecha: {type: Date, default: Date.now},
  dientes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Diente'}],
  observaciones: {type: String},
});
module.exports = mongoose.model('Odontograma', odontogramaSchema);