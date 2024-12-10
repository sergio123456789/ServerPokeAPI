const Pokemon = require('../models/Pokemon.Model');

let pokemons = [];  //guardamos a los pokemon en memoria
// get lista de pokemones
// solo respondemos todo el objeto pokemons con todos los pokemones creadors
getListPokemon = (req, res) => {
    const {ini,ter} = req.params;
    if(ini,ter){

    }  
    //valido que existan pokemones antes de responder
    if (pokemons.length === 0) {
        return res.status(204).send();  // uso el 204 sin contenido, sin cuerpo
    }
    res.status(200).json({
        status: 'sucess',
        data: pokemons 
    })
}
// get pkemon por id 
getPokemon = (req, res) => {
    const { id } = req.params;  // Obtener el ID del parámetro de la ruta
    const pokemon = pokemons.find(p => p.id === parseInt(id)); 
    if (!pokemon) {  // Si no se encuentra el Pokémon
        return res.status(404).json({
            status: 'error',
            message: `Pokémon con ID ${id} no encontrado`
        });
    }
    res.status(200).json({
        status: 'success',
        data: pokemon
    });
}

// get pokemon por tipo 
getByTipoPokemon = (req, res) => {
    const { tipo } = req.params;  
    const pokemonsFiltrados = pokemons.filter(p => p.tipo.includes(tipo));
    if (!pokemonsFiltrados) {  // Si no se encuentra el Pokémon
        return res.status(404).json({
            status: 'error',
            message: `Sin pokémones de tipo ${tipo}`
        });
    }
    res.status(200).json({
        status: 'success',
        data: pokemonsFiltrados
    });
}
// get lista de 
getPokemonByTrainer = (req, res) => {
    const trainerId = req.user.id;// sacamos los datos del user desde el token
    const trainerPokemons = pokemons.filter(pokemon => pokemon.trainerId === trainerId);
    if (trainerPokemons.length === 0) {
        return res.status(404).json({
            status: 'success',
            message: "No se encontraron Pokémon para este entrenador",
            data: []
        });
    }
    res.status(200).json({
        status: 'sucess',
        data: trainerPokemons
    });
}
//create pokemon
create = (req, res) => {
    const trainerId = req.user.id;
    //obtengo los datos del body creo el objeto y lo inserto en mi lista de pokemones
    const {  name, type, level} = req.body;

    const newPokemon = new Pokemon(pokemons.length+1, name, type, level, trainerId);
    pokemons.push(newPokemon);
    res.status(201).json({
        status: 'success',
        message: "Pokémon creado",
        data: newPokemon 
    });
}
//actuloza pokemon
put = (req, res) => {
    const pokemonId = parseInt(req.params.id);  
    const { name, type, level } = req.body; 
// busco el pokemon
    const pokemon = pokemons.find(pokemon => pokemon.id === pokemonId);
    //como siempre si no esta lo saco
    if (!pokemon) {
        return res.status(404).json({
            status: "error",
            message: "Pokémon no encontrado"
        });
    }
    // valido al entrenador
    if (pokemon.trainerId !== req.user.id) {
        return res.status(403).json({//repondo prohibido
            status: "error",
            message: "No tienes permiso para actualizar este Pokémon"
        });
    }
    // Actualizo el campo si el valor llega
    if (name) pokemon.name = name;
    if (type) pokemon.type = type;
    if (level) pokemon.level = level;

    res.status(200).json({
        status: "success",
        message: "Pokémon actualizado con éxito",
        data: pokemon
    });
}
//borra un pokemon
deletePoke = (req, res) => {
    const pokemonId = parseInt(req.params.id);  
    const pokemonIndex = pokemons.findIndex(pokemon => pokemon.id === pokemonId);
    //si no esta el status 404 
    if (pokemonIndex === -1) {
        return res.status(404).json({
            status: "error",
            message: "Pokémon no encontrado"
        });
    }
    // valido al entrenador
    if (pokemons[pokemonIndex].trainerId !== req.user.id) {
        return res.status(403).json({
            status: "error",
            message: "No tienes permiso para eliminar este Pokémon"
        });
    }
    // qiuto al pokemon del array
    pokemons.splice(pokemonIndex, 1);
    res.status(200).json({
        status: 'sucess',
        message: "Pokémon eliminado con éxito"
    });
}

module.exports = {
    getListPokemon,
    getPokemon,
    getByTipoPokemon,
    getPokemonByTrainer,
    create,
    put,
    deletePoke
}