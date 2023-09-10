'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      file.belongsTo(models.device, {
        foreignKey: 'deviceId',
        // targetId: 'id'
      })

      file.belongsTo(models.certificateType, {
        foreignKey: 'certificateTypeId',
        // targetId: 'id'
      })

      file.belongsTo(models.customer, {
        foreignKey: 'customerId',
        // targetId: 'id'
      })

    }
  }
  file.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    sede: DataTypes.STRING,
    activoFijo: DataTypes.STRING,
    serie: DataTypes.STRING,
    calibrationDate: DataTypes.DATE,
    nextCalibrationDate: DataTypes.DATE,
    filePath: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    deviceId: DataTypes.INTEGER,
    certificateTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};