import Sequelize from 'sequelize';
import config from './configEnv.js';

// Configura la conexión a tu base de datos PostgreSQL
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost, // Puedes cambiarlo si tu base de datos está en otro servidor
  dialect: 'postgres', // Usa 'postgres' para PostgreSQL
  logging: true, // Puedes habilitar los registros de consultas si lo deseas
});

// Exporta la instancia de Sequelize
export default sequelize;
