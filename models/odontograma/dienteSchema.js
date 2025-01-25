const mongoose = require('mongoose');

const esquemaDiente = new mongoose.Schema({
  numeroDiente: { type: String, required: true },
  superficie: { type: String, required: true },
  tratamiento: { type: String, required: true },
  notas: String
});

module.exports = mongoose.model('Diente', esquemaDiente);