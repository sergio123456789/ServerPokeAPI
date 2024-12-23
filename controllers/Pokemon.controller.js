const Pokemon = require('../models/Pokemon.Model'); // Importa el modelo de Pokémon
const User = require('../models/Entrenador.Model'); // Si necesitas validar con usuarios

// Obtener lista de todos los Pokémon (público)
const getListPokemon = async (req, res) => {
    try {
        const pokemons = await Pokemon.find(); // Obtiene todos los pokemones
        if (pokemons.length === 0) {
            return res.status(204).send(); // Sin contenido
        }
        res.status(200).json({
            status: 'success',
            data: pokemons,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener Pokémon por ID (público)
const getPokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findById(id); // Busca por ID
        if (!pokemon) {
            return res.status(404).json({
                status: 'error',
                message: `Pokémon con ID ${id} no encontrado`,
            });
        }
        res.status(200).json({
            status: 'success',
            data: pokemon,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener Pokémon por tipo (público)
const getByTipoPokemon = async (req, res) => {
    try {
        const { tipo } = req.params;
        const pokemons = await Pokemon.find({ type: tipo }); // Filtra por tipo
        if (pokemons.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: `Sin pokémones de tipo ${tipo}`,
            });
        }
        res.status(200).json({
            status: 'success',
            data: pokemons,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Obtener Pokémon por entrenador (autenticado)
const getPokemonByTrainer = async (req, res) => {
    try {
        const trainerId = req.user.id; // Obtiene ID del usuario autenticado
        const pokemons = await Pokemon.find({ trainerId }); // Filtra por entrenador
        if (pokemons.length === 0) {
            return res.status(404).json({
                status: 'success',
                message: 'No se encontraron Pokémon para este entrenador',
                data: [],
            });
        }
        res.status(200).json({
            status: 'success',
            data: pokemons,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Crear un Pokémon (autenticado)
const create = async (req, res) => {
    try {
        const trainerId = req.user.id; // ID del entrenador autenticado
        const { name, type, level } = req.body;

        const newPokemon = await Pokemon.create({
            name,
            type,
            level,
            trainerId,
        });

        res.status(201).json({
            status: 'success',
            message: 'Pokémon creado',
            data: newPokemon,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar un Pokémon (autenticado)
const put = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, level } = req.body;
        const pokemon = await Pokemon.findById(id);

        if (!pokemon) {
            return res.status(404).json({
                status: 'error',
                message: 'Pokémon no encontrado',
            });
        }

        if (pokemon.trainerId.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'No tienes permiso para actualizar este Pokémon',
            });
        }

        // Actualiza solo los campos proporcionados
        if (name) pokemon.name = name;
        if (type) pokemon.type = type;
        if (level) pokemon.level = level;

        await pokemon.save();

        res.status(200).json({
            status: 'success',
            message: 'Pokémon actualizado con éxito',
            data: pokemon,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar un Pokémon (autenticado)
const deletePoke = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findById(id);

        if (!pokemon) {
            return res.status(404).json({
                status: 'error',
                message: 'Pokémon no encontrado',
            });
        }

        if (pokemon.trainerId.toString() !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'No tienes permiso para eliminar este Pokémon',
            });
        }

        await pokemon.remove();

        res.status(200).json({
            status: 'success',
            message: 'Pokémon eliminado con éxito',
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getListPokemon,
    getPokemon,
    getByTipoPokemon,
    getPokemonByTrainer,
    create,
    put,
    deletePoke,
};
