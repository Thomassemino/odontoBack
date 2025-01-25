const mongoose = require('mongoose');

const dienteSchema = new mongoose.Schema({
  numeroDiente: { type: String, required: true },
  superficie: { type: String, required: true },
  tratamiento: { type: String, required: true },
  notas: String
});

module.exports = mongoose.model('Diente', dienteSchema);