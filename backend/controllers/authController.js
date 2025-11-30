const { User } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Buscar usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // 2. Validación de contraseña (SIMULADA para esta demo)
    // En un entorno real usaríamos bcrypt.compare()
    // Aquí aceptamos cualquier contraseña si el usuario existe para facilitar pruebas
    if (password === '') {
        return res.status(400).json({ msg: 'La contraseña es obligatoria' });
    }

    // 3. Responder con los datos del usuario (sin el hash de la contraseña)
    res.json({
      msg: 'Login exitoso',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};