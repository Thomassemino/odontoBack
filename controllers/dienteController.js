const dienteLogic = require('../logic/dienteLogic');
async function createDiente(req, res) {
  const diente = await dienteLogic.createDiente(req.body);
  res.status(201).json(diente);
}  
module.exports = {createDiente};