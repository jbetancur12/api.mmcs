import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { File } from './File.js';

export const Device = sequelize.define('devices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});


Device.hasMany(File, {
  foreignKey: 'deviceId',
  // sourceKey: 'id'
})

File.belongsTo(Device, {
  foreignKey: 'deviceId',
  // targetId: 'id'
})

