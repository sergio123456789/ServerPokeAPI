const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const entrenadorRoutes = require("./routes/Entrenador.route");
const pokemonRoutes = require("./routes/Pokemon.routes");

app.use("/api", entrenadorRoutes);
app.use("/api", pokemonRoutes);

//rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Ruta no encontrada",
    });
});

//errores del server
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
    });
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Ejecutando API pokemon puerto :"+port)
})