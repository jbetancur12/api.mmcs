import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const File = sequelize.define('files', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dalibrationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

