const mongoose = require('mongoose');

const historiaClinicaSchema = new mongoose.Schema({
    alergia: { type: String, maxlength: 240 },
    padeceEnfermedad: { type: String, maxlength: 240 },
    esPacienteCardiaco: { type: Boolean },
    tomaMedicacion: { type: String, maxlength: 240 },
    estadoActualBoca: { type: String, maxlength: 240 },
    anotacionesMedico: { type: String, maxlength: 240 }
});

module.exports = mongoose.model('HistoriaClinica', historiaClinicaSchema);
