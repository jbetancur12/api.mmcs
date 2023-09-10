'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class certificateType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      certificateType.hasMany(models.file, {
        foreignKey: 'certificateTypeId',
        // sourceKey: 'id'
      })
    }
  }
  certificateType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'certificateType',
  });
  return certificateType;
};