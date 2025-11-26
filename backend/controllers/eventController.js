const { Event, User } = require('../models');

// Obtener todos los eventos
exports.getAllEvents = async (req, res) => {
  try {
    // Busca todos los eventos e incluye el nombre del organizador
    const events = await Event.findAll({
      include: [{
        model: User,
        as: 'organizer',
        attributes: ['full_name'] // Solo traemos el nombre, no la contraseña
      }]
    });
    
    // Responde con los datos en formato JSON
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los eventos' });
  }
};