'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      customer.hasMany(models.file, {
        foreignKey: 'customerId',
        // sourceKey: 'id'
      })

      customer.hasMany(models.user, {
        foreignKey: 'customerId',
        // sourceKey: 'id'
      })
    }
  }
  customer.init({
    nombre: DataTypes.STRING,
    identificacion: DataTypes.STRING,
    direccion: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    departamento: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};