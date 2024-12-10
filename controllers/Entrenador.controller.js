const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Entrenador = require('../models/Entrenador.Model');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

let entrenadores = [];  //guardamos a los entrenadores en memoria
register = (req, res) => {
    const { username, password, role } = req.body;

    const usuarioExistente = entrenadores.find((entrenador) => entrenador.username === username);
    if (usuarioExistente) {
        return res.status(400).json({ status: 'error', message: 'El usuario ya existe' });
    }
    // encripto la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newEntrenador = new Entrenador(entrenadores.length + 1, username, hashedPassword, role);

    entrenadores.push(newEntrenador);
    res.status(201).json({ 
        status: "success", 
        message: "Usuario registrado"
    });
}

login  = (req, res) => {
    const { username, password } = req.body;

    const entrenador = entrenadores.find((entrenador) => entrenador.username === username);
    if (!entrenador) {
        return res.status(401).json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
    }
   
    const isPasswordValid = bcrypt.compareSync(password, entrenador.password);
    if (!isPasswordValid) {
        return res.status(401).json({ status: 'error', message: 'Usuario o contraseña incorrectos' });
    }
    // Generar el token y se lo devulvo para los otros servicios
    const token = jwt.sign({ id: entrenador.id, username: entrenador.username, role: entrenador.role }, JWT_SECRET_KEY, {
        expiresIn: '1h', 
    });

    res.status(200).json({
        status: 'success',
        message: 'Login exitoso',
        data: {
            "token" : token 
        }
    });
}

module.exports = {
    register,
    login
}