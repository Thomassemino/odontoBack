const mongoose = require('mongoose');

// Definición del esquema para "Tratamientos"
const tratamientoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    monto: {
      type: Number,
      required: false,
      default: 0
    }
  },
);

const Tratamiento = mongoose.model('Tratamiento', tratamientoSchema);

module.exports = Tratamiento;