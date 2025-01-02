const { Router: expressRouter } = require("express");
const router = expressRouter();


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

module.exports = router;