'use strict';
const bcrypt = require('bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      user.belongsTo(models.customer, {
        foreignKey: 'customerId',
        //targetId: 'id'
      })

    }
  }

  user.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    verificationCode: DataTypes.STRING,
    customerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });


  user.beforeCreate(async (user, options) => {
    // Generar un código de verificación seguro usando bcrypt
    const saltRounds = 10; // Puedes ajustar el número de rondas según tu preferencia
    const verificationCode = await bcrypt.hash(Math.random().toString(36).substring(7), saltRounds);

    // Asignar el código de verificación al usuario
    user.verificationCode = verificationCode;
  });

  return user;
};