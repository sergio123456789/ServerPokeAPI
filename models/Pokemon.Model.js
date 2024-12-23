const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    type: { type: String, required: true, minlength: 3, maxlength: 20 },
    level: { type: Number, required: true, min: 1, max: 100 },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
