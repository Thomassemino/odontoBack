const mongoose = require('mongoose');

const historiaClinicaSchema = new mongoose.Schema({
    datosPersonalesMedicos: {
        enfermedades: { type: String, maxlength: 240 },
        tratamientoActual: { type: String, maxlength: 240 },
        medicamentosRegulares: { type: String, maxlength: 240 },
        enfermedadInfectoInfecciosa: { type: String, maxlength: 240 },
        fuma: { type: Boolean },
        embarazo: { type: Boolean },
        enfermedadConstancia: { type: String, maxlength: 240 },
        alergias: { type: String, maxlength: 240 },
        diabetes: { type: Boolean },
        enfermedadTransmisionSexual: { type: String, maxlength: 240 },
        motivoConsulta: { type: String, maxlength: 240 }
    },
    antecedentesMedicosOdontologicos: {
        consultoOdontologo: { type: Boolean },
        tratamientoOdontologico: {
            descripcion: { type: String, maxlength: 240 },
            desdeCuando: { type: String, maxlength: 240 }
        },
        dolor: { type: String, maxlength: 240 },
        fracturaDiente: { type: String, maxlength: 240 },
        dificultadMasticar: { type: Boolean },
        dificultadAbrirBoca: { type: Boolean }
    },
    estadoActual: {
        anormalidadBoca: { type: String, maxlength: 240 },
        sangradoEncias: { type: Boolean },
        hinchazonCara: { type: Boolean },
        higieneBucal: { type: String, enum: ['muy bueno', 'bueno', 'malo', 'muy malo'] }
    },
    aclaracionesFinalesMedico: { type: String, maxlength: 240 }
});

module.exports = mongoose.model('HistoriaClinica', historiaClinicaSchema);


