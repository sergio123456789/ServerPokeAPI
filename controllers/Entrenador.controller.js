const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Entrenador = require('../models/Entrenador.Model'); 
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

// Registrar un nuevo entrenador
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Verifica si el usuario ya existe
        const usuarioExistente = await Entrenador.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ status: 'error', message: 'El usuario ya existe' });
        }

        // Encripta la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo entrenador
        const newEntrenador = new Entrenador({
            username,
            password: hashedPassword,
            role,
        });

        // Guarda al entrenador 
        await newEntrenador.save();

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado',
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Iniciar sesión y generar JWT
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busca al entrenador 
        const entrenador = await Entrenador.findOne({ username });
        if (!entrenador) {
            return res.status(401).json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        // Compara la contraseña con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, entrenador.password);
        if (!isPasswordValid) {
            return res.status(401).json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
        }

        // Genera y retorna el token JWT
        const token = jwt.sign(
            { id: entrenador._id, username: entrenador.username, role: entrenador.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 'success',
            message: 'Login exitoso',
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    register,
    login,
};
