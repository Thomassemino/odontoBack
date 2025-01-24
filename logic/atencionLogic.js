
const Atencion = require('../models/atenciones/atencionesSchema');

class AtencionService {
    async createAtencion(atencionData) {
        try {
            const atencion = new Atencion(atencionData);
            return await atencion.save();
        } catch (error) {
            throw new Error(`Error creating atención: ${error.message}`);
        }
    }

    async getAtencionesByPaciente(pacienteId) {
        try {
            return await Atencion.find({ paciente: pacienteId })
                .populate('paciente');
        } catch (error) {
            throw new Error(`Error fetching atenciones: ${error.message}`);
        }
    }

    async getAtencionByPacienteAndDate(pacienteId, fecha) {
        try {
            return await Atencion.findOne({ 
                paciente: pacienteId, 
                fecha: new Date(fecha) 
            }).populate('paciente');
        } catch (error) {
            throw new Error(`Error fetching atención: ${error.message}`);
        }
    }

    async updateAtencion(pacienteId, fecha, updateData) {
        try {
            return await Atencion.findOneAndUpdate(
                { paciente: pacienteId, fecha: new Date(fecha) },
                updateData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error updating atención: ${error.message}`);
        }
    }

    async deleteAtencion(pacienteId, fecha) {
        try {
            return await Atencion.findOneAndDelete({ 
                paciente: pacienteId, 
                fecha: new Date(fecha) 
            });
        } catch (error) {
            throw new Error(`Error deleting atención: ${error.message}`);
        }
    }
}

module.exports = new AtencionService();
