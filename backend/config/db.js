const { Sequelize } = require('sequelize');
require('dotenv').config(); // Cargar variables de entorno

// Configuración de la conexión a la base de datos
// Se conecta a 'conecta_voluntarios' usando el usuario y contraseña de tu MySQL local
const sequelize = new Sequelize(
  process.env.DB_NAME || 'conecta_voluntarios', // Nombre de la BD
  process.env.DB_USER || 'root',                // Usuario
  process.env.DB_PASSWORD || '12345',                // Contraseña
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Poner en true si quieres ver las consultas SQL en la consola
  }
);

// Función para probar la conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL exitosa.');
    
    // Sincronizar modelos (opcional: crea tablas si no existen, pero ya usamos el script SQL)
    // await sequelize.sync(); 
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error);
    process.exit(1); // Detener la app si no hay DB
  }
};

module.exports = { sequelize, connectDB };