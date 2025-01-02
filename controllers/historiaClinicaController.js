const historiaClinicaLogic = require('../logic/historiaClinicaLogic');


const create = async (req, res) => {
    console.log(req.body);
    try {
        const { newHistoriaClinica, pacienteActualizado } = await historiaClinicaLogic.create(req);
        res.status(200).json({ 
            message: 'Historia clínica creada y asociada correctamente',
            historiaClinica: newHistoriaClinica,
            paciente: pacienteActualizado
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};


const deleteHc = async (req, res) => {
    try {
        const historiaClinica = await historiaClinicaLogic.deleteHc(req);
        res.status(200).json({ historiaClinica: historiaClinica });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}

const updateHc = async (req, res) => {
    try {
        const historiaClinica = await historiaClinicaLogic.updateHc(req);
        res.status(200).json({ historiaClinica: historiaClinica });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}

const getHc = async (req, res) => {
    try {
        const historiaClinica = await historiaClinicaLogic.getHc(req);
        res.status(200).json({ historiaClinica: historiaClinica });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
}

module.exports = {
    create,
    deleteHc,
    updateHc,
    getHc,
}
