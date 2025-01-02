const HistoriaClinicaSchema = require("../models/historiaClinica/historiaClinicaSchema");


const PacienteSchema = require('../models/pacientes/pacienteSchema'); // Importa el modelo Paciente

async function create(request) {    
    try {
        // Crear nueva historia clínica
        const newHistoriaClinica = new HistoriaClinicaSchema({
            datosPersonalesMedicos: {
                enfermedades: request.body.enfermedades,
                tratamientoActual: request.body.tratamientoActual,
                medicamentosRegulares: request.body.medicamentosRegulares,
                enfermedadInfectoInfecciosa: request.body.enfermedadInfectoInfecciosa,
                fuma: request.body.fuma,
                embarazo: request.body.embarazo,
                enfermedadConstancia: request.body.enfermedadConstancia,
                alergias: request.body.alergias,
                diabetes: request.body.diabetes,
                enfermedadTransmisionSexual: request.body.enfermedadTransmisionSexual,
                motivoConsulta: request.body.motivoConsulta
            },
            antecedentesMedicosOdontologicos: {
                consultoOdontologo: request.body.consultoOdontologo,
                tratamientoOdontologico: {
                    descripcion: request.body.tratamientoOdontologicoDescripcion,
                    desdeCuando: request.body.tratamientoOdontologicoDesdeCuando
                },
                dolor: request.body.dolor,
                fracturaDiente: request.body.fracturaDiente,
                dificultadMasticar: request.body.dificultadMasticar,
                dificultadAbrirBoca: request.body.dificultadAbrirBoca
            },
            estadoActual: {
                anormalidadBoca: request.body.anormalidadBoca,
                sangradoEncias: request.body.sangradoEncias,
                hinchazonCara: request.body.hinchazonCara,
                higieneBucal: request.body.higieneBucal
            },
            aclaracionesFinalesMedico: request.body.aclaracionesFinalesMedico
        });

        // Guardar historia clínica
        await newHistoriaClinica.save();

        // Asociar historia clínica al paciente
        const pacienteId = request.body.pacienteId; // Asegúrate de recibir el ID del paciente
        if (!pacienteId) {
            throw new Error('El ID del paciente es obligatorio para asociar la historia clínica');
        }

        const pacienteActualizado = await PacienteSchema.findByIdAndUpdate(
            pacienteId,
            { historiaClinica: newHistoriaClinica._id },
            { new: true }
        ).populate('historiaClinica'); // Para traer la historia clínica asociada

        if (!pacienteActualizado) {
            throw new Error('No se encontró un paciente con el ID proporcionado');
        }

        return { newHistoriaClinica, pacienteActualizado };  
    } catch (error) {
        console.error('Error al crear y asociar historia clínica:', error.message);
        throw new Error(error.message);
    }
}

async function deleteHc(request) {
    try {
        const deletedHistoriaClinica = await HistoriaClinicaSchema.findOneAndDelete({ _id: request.params.id });
        if (!deletedHistoriaClinica) {
            throw new Error('Historia Clinica no encontrada');
        }
        return deletedHistoriaClinica; // Retorna la historia clinica que fue eliminada
    } catch (error) {
        throw new Error(`Error al eliminar historia clinica: ${error.message}`);
    }
}

async function updateHc(request) {
    try {
        const updatedHistoriaClinica = await HistoriaClinicaSchema.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        if (!updatedHistoriaClinica) {
            throw new Error('Historia Clinica no encontrada');
        }
        return updatedHistoriaClinica; // Retorna la historia clinica que fue actualizada
    } catch (error) {
        throw new Error(`Error al actualizar historia clinica: ${error.message}`);
    }
}

async function getHc(request){
    try {
        const historiaClinica = await HistoriaClinicaSchema.findOne({ _id: request.params.id });
        if (!historiaClinica) {
            throw new Error('Historia Clinica no encontrada');
        }

        return historiaClinica;
    } catch (error) {
        throw new Error(`Error al obtener historia clinica: ${error.message}`);
    }
}

module.exports = {
    create,
    deleteHc,
    updateHc,
    getHc,
  };
  