import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { File } from './File.js';

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  departamento: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    defaultValue: "user"
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationCode: {
    type: DataTypes.STRING,
  }
});

User.beforeCreate(async (user, options) => {
  // Generar un código de verificación seguro usando bcrypt
  const saltRounds = 10; // Puedes ajustar el número de rondas según tu preferencia
  const verificationCode = await bcrypt.hash(Math.random().toString(36).substring(7), saltRounds);

  // Asignar el código de verificación al usuario
  user.verificationCode = verificationCode;
});


User.hasMany(File, {
  foreignKey: 'userId',
  // sourceKey: 'id'
})

File.belongsTo(User, {
  foreignKey: 'userId',
  // targetId: 'id'
})





