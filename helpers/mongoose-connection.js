const mongoose = require("mongoose");
const mongoAtlasUri = `mongodb://127.0.0.1:27017/thomasdb`;

async function conexionMongoose() {
    try {
        // Configurar modo estricto para consultas
        mongoose.set('strictQuery', true);

        await mongoose.connect(mongoAtlasUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 30000, // 30 segundos
            connectTimeoutMS: 30000 // 30 segundos
        });

        const conexionBD = mongoose.connection;

        conexionBD.on("error", (err) => {
            console.error(`Error de conexión de Mongoose: ${err}`);
            // Opcionalmente enviar error a servicio de monitoreo
        });

        conexionBD.on("disconnected", () => {
            console.warn("Conexión con MongoDB perdida");
            // Intentar reconexión
            mongoose.connect(mongoAtlasUri);
        });

        // Manejar cierre de conexión al terminar el proceso
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Conexión de Mongoose cerrada por terminación de la aplicación');
            process.exit(0);
        });

        console.log("Conexión a MongoDB establecida exitosamente");
    } catch (error) {
        console.error("Fallo catastrófico en la conexión de MongoDB:", {
            mensaje: error.message,
            traza: error.stack
        });
        
        // Manejo de errores específicos
        if (error.name === 'MongoNetworkError') {
            console.error("Problema de conexión de red con MongoDB");
        }

        process.exit(1);
    }
}

module.exports = conexionMongoose;