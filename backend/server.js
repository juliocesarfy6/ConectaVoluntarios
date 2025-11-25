const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());                 // Permitir peticiones desde Angular (otro puerto)
app.use(express.json());         // Habilitar lectura de JSON en el body de las peticiones

// --- CONEXIÓN A BASE DE DATOS ---
connectDB();

// --- RUTAS DE PRUEBA ---
app.get('/', (req, res) => {
  res.send('API de ConectaVoluntarios funcionando 🚀');
});

// Aquí importaremos las rutas más adelante (ej: /api/users, /api/events)
// app.use('/api/users', require('./routes/userRoutes'));

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});