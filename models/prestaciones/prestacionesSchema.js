const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true,
    min: 0
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const prestacionesSchema = new mongoose.Schema({
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: [true, 'El ID del paciente es obligatorio']
  },
  tratamientoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tratamiento',
    required: [true, 'El ID del tratamiento es obligatorio']
  },
  precio: {
    type: Number, 
    required: true, 
    min: 0,
    message: 'El precio es obligatorio y debe ser mayor a 0'
  },
  pagos: [pagoSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual para calcular el total pagado
prestacionesSchema.virtual('totalPagado').get(function() {
  return this.pagos.reduce((total, pago) => total + pago.monto, 0);
});

// Virtual para calcular el saldo pendiente
prestacionesSchema.virtual('saldoPendiente').get(function() {
  return this.precio - this.totalPagado;
});

// Asegurar que los virtuals se incluyan cuando el documento se convierte a JSON
prestacionesSchema.set('toJSON', { virtuals: true });
prestacionesSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Prestaciones', prestacionesSchema);