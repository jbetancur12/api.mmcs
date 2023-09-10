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
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sede: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activoFijo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  calibrationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nextCalibrationDate :
  {
    type: DataTypes.DATE,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

