const express = require("express");
const app = express();
const cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");




// Middleware para manejar JSON y datos URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
app.use(cors());

// Conectar a la base de datos
mongooseConnection();

// Rutas
app.use("/api", appRoutes);

// Manejo de rutas no encontradas
app.use((_, res) => {
    res.status(404).send({
        message: 'loco te estas metiendo donde no debes'
    });
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
