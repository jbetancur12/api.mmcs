import bcrypt from 'bcrypt';
import 'dotenv/config';
import db from './models/index.cjs';

const User = db.user

export const createAdminUser = async () => {
  try {
    // Verificar si el usuario administrador ya existe
    const existingAdmin = await User.findOne({ where: { email: process.env.ADMIN_USER } });

    if (!existingAdmin) {
      // Si el usuario administrador no existe, crearlo
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);
      await User.create({
        nombre: 'Administrator',
        email: process.env.ADMIN_USER,
        contraseña: hashedPassword,
        active: true,
        // customerId:0,
        rol: 'admin', // Asigna el rol de administrador
      });

      console.log('Usuario administrador creado con éxito.');
    } else {
      console.log('El usuario administrador ya existe en la base de datos.');
    }
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  }
};

