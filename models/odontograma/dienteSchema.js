const mongoose = require('mongoose');
const dienteSchema = new mongoose.Schema({
  numeroDiente: {type: String, required: true},
  superficies: [{type: String, enum: ['Incisal', 'Oclusal', 'Mesial', 'Distal', 'Bucal', 'Labial', 'Palatina', 'Lingual', 'Cervical']}],
  tratamiento: {type: String, enum: ['Restauración', 'Carilla de Porcelana', 'Sellador de Fisuras', 'Corona']},
});
module.exports = mongoose.model('Diente', dienteSchema);