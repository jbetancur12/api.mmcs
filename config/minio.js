import { Client } from 'minio';
import config from './configEnv.js';

// Configura la conexión a Minio
const minioClient = new Client({
  endPoint: config.minioHost, // Cambia a la dirección de tu servidor Minio
  port: 9000, // Cambia al puerto de tu servidor Minio
  useSSL: false, // Cambia a true si usas SSL/TLS
  accessKey: config.minioAccessKey, // Reemplaza con tu clave de acceso de Minio
  secretKey: config.minioSecretKey, // Reemplaza con tu clave secreta de Minio
});

// Exporta el cliente Minio configurado
export default  minioClient
