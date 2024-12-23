const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Conectado a MongoDB');
        })
        .catch((error) => {
            console.error('Error de conexión a MongoDB:', error);
        });
        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error(`Error al conectar a MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
