const mongoose = require('mongoose');
const esquemaOdontograma = new mongoose.Schema({
  idPaciente: {type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true},
  fecha: {type: Date, default: Date.now},
  dientes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Diente'}]
});
module.exports = mongoose.model('Odontograma', esquemaOdontograma);