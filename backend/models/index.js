const { sequelize } = require('../config/db');
const User = require('./User');
const Event = require('./Event');

// --- DEFINIR RELACIONES ---

// 1. Una Organización (User) crea muchos Eventos
User.hasMany(Event, { foreignKey: 'organizer_id', as: 'organizedEvents' });
Event.belongsTo(User, { foreignKey: 'organizer_id', as: 'organizer' });

// (Más adelante agregaremos la relación de Inscripciones aquí)

// Exportamos los modelos ya relacionados y la conexión
module.exports = {
  sequelize,
  User,
  Event
};