const mongoose = require('mongoose');

const EntrenadorSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // user o admin
});

module.exports = mongoose.model('Entrenador', EntrenadorSchema);
