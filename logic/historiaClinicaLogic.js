const HistoriaClinicaSchema = require("../models/historiaClinica/historiaClinicaSchema");


const PacienteSchema = require('../models/pacientes/pacienteSchema'); // Importa el modelo Paciente

async function create(request) {    
    try {
        // Crear nueva historia clínica con la nueva estructura
        const newHistoriaClinica = new HistoriaClinicaSchema({
            alergia: request.body.alergia,
            padeceEnfermedad: request.body.padeceEnfermedad,
            esPacienteCardiaco: request.body.esPacienteCardiaco,
            tomaMedicacion: request.body.tomaMedicacion,
            estadoActualBoca: request.body.estadoActualBoca,
            anotacionesMedico: request.body.anotacionesMedico
        });

        // Guardar la nueva historia clínica
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
  

