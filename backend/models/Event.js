const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Medio Ambiente', 'Educación', 'Salud', 'Social', 'Animales'),
    allowNull: false
  },
  event_date: {
    type: DataTypes.DATEONLY, // Solo la fecha
    allowNull: false
  },
  event_time: {
    type: DataTypes.TIME,     // Solo la hora
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  max_volunteers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    defaultValue: 'active'
  },
  image_url: DataTypes.STRING(255)
}, {
  tableName: 'events',
  timestamps: true,      // Mantenemos timestamps activado para created_at
  underscored: true,     // Convierte camelCase a snake_case automáticamente
  updatedAt: false       // <--- ESTA LÍNEA SOLUCIONA TU ERROR (Desactiva la búsqueda de updated_at)
});

module.exports = Event;