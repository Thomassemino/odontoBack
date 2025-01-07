const HistoriaClinicaSchema = require("../models/historiaClinica/historiaClinicaSchema");


const PacienteSchema = require('../models/pacientes/pacienteSchema'); // Importa el modelo Paciente

async function create(request) {    
    try {
        // Crear nueva historia clínica respetando la estructura correcta
        const newHistoriaClinica = new HistoriaClinicaSchema({
            datosPersonalesMedicos: {
                enfermedades: request.body.datosPersonalesMedicos?.enfermedades,
                tratamientoActual: request.body.datosPersonalesMedicos?.tratamientoActual,
                medicamentosRegulares: request.body.datosPersonalesMedicos?.medicamentosRegulares,
                enfermedadInfectoInfecciosa: request.body.datosPersonalesMedicos?.enfermedadInfectoInfecciosa,
                fuma: request.body.datosPersonalesMedicos?.fuma,
                embarazo: request.body.datosPersonalesMedicos?.embarazo,
                enfermedadConstancia: request.body.datosPersonalesMedicos?.enfermedadConstancia,
                alergias: request.body.datosPersonalesMedicos?.alergias,
                diabetes: request.body.datosPersonalesMedicos?.diabetes,
                enfermedadTransmisionSexual: request.body.datosPersonalesMedicos?.enfermedadTransmisionSexual,
                motivoConsulta: request.body.datosPersonalesMedicos?.motivoConsulta
            },
            antecedentesMedicosOdontologicos: {
                consultoOdontologo: request.body.antecedentesMedicosOdontologicos?.consultoOdontologo,
                tratamientoOdontologico: {
                    descripcion: request.body.antecedentesMedicosOdontologicos?.tratamientoOdontologico?.descripcion,
                    desdeCuando: request.body.antecedentesMedicosOdontologicos?.tratamientoOdontologico?.desdeCuando
                },
                dolor: request.body.antecedentesMedicosOdontologicos?.dolor,
                fracturaDiente: request.body.antecedentesMedicosOdontologicos?.fracturaDiente,
                dificultadMasticar: request.body.antecedentesMedicosOdontologicos?.dificultadMasticar,
                dificultadAbrirBoca: request.body.antecedentesMedicosOdontologicos?.dificultadAbrirBoca
            },
            estadoActual: {
                anormalidadBoca: request.body.estadoActual?.anormalidadBoca,
                sangradoEncias: request.body.estadoActual?.sangradoEncias,
                hinchazonCara: request.body.estadoActual?.hinchazonCara,
                higieneBucal: request.body.estadoActual?.higieneBucal
            },
            aclaracionesFinalesMedico: request.body.aclaracionesFinalesMedico
        });

        // Guardar historia clínica
        await newHistoriaClinica.save();

        // Asociar historia clínica al paciente
        const pacienteId = request.body.pacienteId;
        if (!pacienteId) {
            throw new Error('El ID del paciente es obligatorio para asociar la historia clínica');
        }

        const pacienteActualizado = await PacienteSchema.findByIdAndUpdate(
            pacienteId,
            { historiaClinica: newHistoriaClinica._id },
            { new: true }
        ).populate('historiaClinica'); 

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
  