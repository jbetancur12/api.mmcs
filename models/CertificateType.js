import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { File } from './File.js';

export const CertificateType = sequelize.define('certificateTypes', {
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


CertificateType.hasMany(File, {
  foreignKey: 'certificateTypeId',
  sourceKey: 'id'
})

File.belongsTo(CertificateType, {
  foreignKey: 'certificateTypeId',
  targetId: 'id'
})
