const SecretariaLogic = require("../logic/secretariaLogic");


const create = async (req, res) => {
    try {
        const secretaria = await SecretariaLogic.create(req);
        res.status(200).json({ secretaria: secretaria });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para buscar una secretaria por nombre
const findByName = async (req, res) => {
    try {
        const secretaria = await SecretariaLogic.findByName(req);
        if (!secretaria) {
            return res.status(404).json({ status: 'error', message: 'Secretaria/o no encontrada/o' });
        }
        res.status(200).json({ secretaria: secretaria });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Controlador para eliminar una secretaria por nombre
const deleteByName = async (req, res) => {
    try {
        const deletedSecretaria = await SecretariaLogic.deleteByName(req);
        res.status(200).json({ status: 'success', message: 'Secretaria/o eliminada/o', secretaria: deletedSecretaria });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'error', message: 'No se pudo eliminar la Secretaria: '+ err.message });
    }
};

async function actualizarSecretaria(req, res) {
    try {
      const { id } = req.params;
      const secretaria = await SecretariaLogic.actualizarSecretaria(id, req.body);
      res.status(200).json(empresa);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la secretaria', detalle: error.message });
    }
  }

module.exports = {
    create,
    deleteByName,
    findByName,
    actualizarSecretaria
};
