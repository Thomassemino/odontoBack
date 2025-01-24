const Diente = require('../models/odontograma/dienteSchema');
async function createDiente(data) {
  return await Diente.create(data);
}
module.exports = {createDiente};