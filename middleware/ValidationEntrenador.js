const Joi = require("joi");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Esquema de validación para autenticación
const entrenadorAuthSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(50).required(),
});

// Esquema de validación para registro
const entrenadorSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(50).required(),
    role: Joi.string().min(2).max(20).required(),
});

// Validación de autenticación
const validateAuthEntrenador = (req, res, next) => {
    const { error } = entrenadorAuthSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "error",
            message: error.details[0].message,
        });
    }
    next();
};

// Validación de datos del entrenador
const validateEntrenador = (req, res, next) => {
    const { error } = entrenadorSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "error",
            message: error.details[0].message,
        });
    }
    next();
};

// Validación del token JWT
const validateTokenEntrenador = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Error, token no existe o no proporcionado" });
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decode; // Guardar usuario en la solicitud
        next();
    } catch (error) {
        return res.status(403).json({ message: "Error, token inválido" });
    }
};

module.exports = {
    validateTokenEntrenador,
    validateEntrenador,
    validateAuthEntrenador,
};
