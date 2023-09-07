import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const File = sequelize.define('file', {
  name: DataTypes.STRING,
  dalibrationDate: DataTypes.DATE,
  filePath: DataTypes.STRING,
});

export default  File;