const Joi = require("joi");

const pokemonSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(), 
    type: Joi.string().min(3).max(20).required(), 
    level: Joi.number().integer().min(1).max(100).required(), 
});

const validatePokemon = (req, res, next) => {
    const { error } = pokemonSchema.validate(req.body); 
    if (error) {
        return res.status(400).json({
            status: "error",
            message: error.details[0].message, 
        });
    }
    next(); 
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({
            status: "error",
            message: "El ID debe ser un número válido",
        });
    }
    next();
};

module.exports = {
    validatePokemon,
    validateId,
};
