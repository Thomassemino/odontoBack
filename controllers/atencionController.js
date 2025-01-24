const AtencionService = require('../logic/atencionLogic');

class AtencionController {
    async createAtencion(req, res) {
        try {
            const atencion = await AtencionService.createAtencion(req.body);
            res.status(201).json(atencion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAtencionesByPaciente(req, res) {
        try {
            const atenciones = await AtencionService.getAtencionesByPaciente(req.params.pacienteId);
            res.status(200).json(atenciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAtencionByPacienteAndDate(req, res) {
        try {
            const atencion = await AtencionService.getAtencionByPacienteAndDate(
                req.params.pacienteId, 
                req.params.fecha
            );
            if (!atencion) {
                return res.status(404).json({ message: 'Atención not found' });
            }
            res.status(200).json(atencion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateAtencion(req, res) {
        try {
            const atencion = await AtencionService.updateAtencion(
                req.params.pacienteId, 
                req.params.fecha, 
                req.body
            );
            if (!atencion) {
                return res.status(404).json({ message: 'Atención not found' });
            }
            res.status(200).json(atencion);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteAtencion(req, res) {
        try {
            const atencion = await AtencionService.deleteAtencion(
                req.params.pacienteId, 
                req.params.fecha
            );
            if (!atencion) {
                return res.status(404).json({ message: 'Atención not found' });
            }
            res.status(200).json({ message: 'Atención deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AtencionController();