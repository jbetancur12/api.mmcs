import 'dotenv/config'

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400, // 24 hours
  dbName: process.env.DB_NAME || "databaseName",
  dbUser: process.env.USER || "postgres",
  dbPass: process.env.DB_PASS || "root",
  dbHost: process.env.DB_HOST || 'localhost',
  minioHost:  process.env.MINIO_HOST || 'localhost',
  minioAccessKey: process.env.MINIO_ACCESS_KEY || 'tu_access_key', // Reemplaza con tu clave de acceso de Minio
  minioSecretKey: process.env.MINIO_SECRET_KEY || 'tu_secret_key',
  minioBucketName : process.env.MINIO_BUCKET_NAME,
  emailFrom: process.env.EMAIL_USER,
  frontURL: process.env.FRONT_URL,
  smtp: {
    service: 'gmail',
    secure: false,
    host: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER
  }
}

export default config