const { Router: expressRouter } = require("express");
const router = expressRouter();

const { backupDatabase } = require('../backup/backup');

// Agrega esta ruta para probar el backup manualmente
router.get('/prueba', async (req, res) => {
  try {
    const backupFile = await backupDatabase();
    res.json({ 
      message: 'Backup realizado exitosamente', 
      file: backupFile 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error en backup', 
      error: error.message 
    });
  }
});

const medicoRoutes = require("./medicoRoutes");
router.use("/medico", medicoRoutes);


const pacienteRoutes = require("./pacienteRoutes");
router.use("/paciente", pacienteRoutes);

const citaRoutes = require("./citaRoutes");
router.use("/citas", citaRoutes);

const empresaRoutes = require("./empresaRoutes");
router.use("/empresa", empresaRoutes);

const secretariaRoutes = require("./secretariaRoutes");
router.use("/secretaria", secretariaRoutes);

const historiaClinicaRoutes = require("./historiaClinicaRoutes");
router.use("/historiaClinica", historiaClinicaRoutes);

const loginRoutes = require("./loginRoutes");
router.use("/login", loginRoutes);

const tratamientoRoutes = require("./tratamientoRoutes");
router.use("/tratamientos", tratamientoRoutes);

const atencionRoutes = require("./atencionRoutes");
router.use("/atenciones", atencionRoutes);

const odontogramaRoutes = require("./odontogramaRoutes");
router.use("/odontograma", odontogramaRoutes);

const prestacionesRoutes = require("./prestacionesRoutes");
router.use("/prestaciones", prestacionesRoutes);
module.exports = router;