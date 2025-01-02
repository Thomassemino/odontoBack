const mongoose = require('mongoose');

async function dropIndex() {
    try {
        await mongoose.connect('mongodb://localhost:27017/thomasdb');
        await mongoose.connection.db.collection('usuarios').dropIndex('username_1');
        console.log('Índice eliminado correctamente');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error al eliminar el índice:', err);
    }
}

dropIndex();