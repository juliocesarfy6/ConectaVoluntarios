const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Definir la ruta GET /api/events
// Cuando alguien visite esta ruta, se ejecuta la función getAllEvents
router.get('/', eventController.getAllEvents);

module.exports = router;