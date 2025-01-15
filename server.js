const express = require("express");
const app = express();
const cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");

const port = process.env.PORT || 5000;
// Configuración de CORS
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: '*',

}));


// Middleware para JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
mongooseConnection();

// Rutas
app.use("/api", appRoutes);

// Manejo de rutas no encontradas
app.use((_, res) => {
    res.status(404).send({
        message: 'loco te estas metiendo donde no debes',
    });
});

const cron = require('node-cron');
const backupDatabase = require('./backup/backup');

cron.schedule('0 17 * * 0', () => {
    console.log('🗓️ Iniciando respaldo de la base de datos... (Domingo a las 5:00 PM)');
    backupDatabase();
});

app.listen(port, () => {
    console.log('🚀 Servidor esta corriendo en http://localhost:${port}');
});