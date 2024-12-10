const express = require("express");
const PoController = require("./../controllers/Pokemon.controller");
const {validateTokenEntrenador} = require("../middleware/ValidationEntrenador");
const { validatePokemon, validateId } = require("../middleware/ValidationPokemon");
const router = express.Router();

// Rutas
router.get("/pokemon", PoController.getListPokemon); 
router.get("/pokemon/:id", validateId, PoController.getPokemon); 
router.get("/pokemon/:tipo", validateId, PoController.getByTipoPokemon); 
router.get("/pokemon/trainer/mypokemons", validateTokenEntrenador, PoController.getPokemonByTrainer); 
router.post("/pokemon", validateTokenEntrenador, validatePokemon, PoController.create); 
router.put("/pokemon/:id", validateTokenEntrenador, validateId, PoController.put); 
router.delete("/pokemon/:id", validateTokenEntrenador, validateId, PoController.deletePoke); 

module.exports = router;
