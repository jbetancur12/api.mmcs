'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      device.hasMany(models.file, {
        foreignKey: 'deviceId',
        // sourceKey: 'id'
      })
    }
  }
  device.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'device',
  });
  return device;
};