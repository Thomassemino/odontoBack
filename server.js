const express = require("express");
const app = express();
const cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");
require('dotenv').config();

const port = process.env.PORT || 5000;
const { scheduleBackup } = require('./backup/backup');


app.use(cors());

// Middleware para JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
mongooseConnection();
scheduleBackup();


// Rutas
app.use("/api", appRoutes);
app.get('/api/login/login', (req, res) => { res.json({ message: 'CORS configurado correctamente' }); });

// Manejo de rutas no encontradas
app.use((_, res) => {
    res.status(404).send({
        message: 'loco te estas metiendo donde no debes',
    });
});


app.listen(port, () => {
    console.log('🚀 Servidor esta corriendo en http://localhost:${port}');
});