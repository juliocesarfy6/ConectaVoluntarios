const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Importamos la conexión que ya probaste

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('volunteer', 'organization', 'institution', 'admin'),
    allowNull: false
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  phone: DataTypes.STRING(20),
  location: DataTypes.STRING(100),
  bio: DataTypes.TEXT,
  profile_image_url: DataTypes.STRING(255),
  institution_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'users', // Debe coincidir con el nombre en MySQL
  timestamps: true,
  underscored: true   // Para que use created_at en lugar de createdAt automáticamente
});

module.exports = User;