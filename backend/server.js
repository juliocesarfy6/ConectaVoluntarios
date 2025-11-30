const express = require('express');
const cors = require('cors');
// CAMBIO IMPORTANTE: Importamos 'sequelize' desde la carpeta de modelos
// Esto carga el archivo index.js que contiene las relaciones (User, Event)
const { sequelize } = require('./models'); 

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- RUTAS DE LA API ---
// ESTA ES LA LÍNEA NUEVA QUE NECESITAS AGREGAR:
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// (Futuras rutas)
// app.use('/api/users', require('./routes/userRoutes'));

// --- FUNCIÓN DE INICIO ---
const startServer = async () => {
  try {
    // 1. Intentar conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa.');
    
    // 2. Sincronizar los modelos (Crear tablas si no existen)
    // force: false asegura que NO borre los datos que ya tienes
    await sequelize.sync({ force: false }); 
    console.log('✅ Modelos (Tablas) sincronizados correctamente.');

    // 3. Iniciar el servidor web (solo si la BD funciona)
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
};

// Ejecutamos la función
startServer();

// --- RUTAS DE PRUEBA ---
app.get('/', (req, res) => {
  res.send('API de ConectaVoluntarios funcionando 🚀');
});