const express = require('express')
const router = express.Router();
const EnController =  require('../controllers/Entrenador.controller')
const {validateAuthEntrenador,validateEntrenador} = require("../middleware/ValidationEntrenador");


router.post("/auth/login",validateAuthEntrenador, EnController.login)
router.post("/auth/register",validateEntrenador, EnController.register)

module.exports = router;