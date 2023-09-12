import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/configEnv.js';
// import { User } from '../models/User.js';

import db from '../models/index.cjs';

const User = db.user
const Customer = db.customer

// Secret key para firmar y verificar JWT (debería ser más seguro en producción)
const JWT_SECRET = config.jwtSecret;

// Función para crear un token JWT
const createToken = (userId, email, rol) => {
  return jwt.sign({ userId, email, rol }, JWT_SECRET, { expiresIn: '1h' });
};


// Registro de usuario
export const registerUser = async (req, res) => {

  const { nombre, email, contraseña, customerId } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash de la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(contraseña, 10);


    // Crear un nuevo usuario
    const newUser = await User.create({
      nombre,
      email,
      customerId,
      contraseña: hashedPassword,
    });


    // Crear un token JWT para el nuevo usuario
    // const token = createToken(newUser.id, newUser.email);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión de usuario
export const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscar al usuario por su dirección de correo electrónico
    const user = await User.findOne({ where: { email } });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(contraseña, user.contraseña))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }



    // Crear un token JWT para el usuario
    const token = createToken(user.id, user.email, user.rol);

    res.status(200).json({ token, user: {
      id: user.id,
      email: user.email,
      name: user.nombre,
      rol: user.rol
    } });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

export const validateToken = async (req,res)=>{
  try {
    // Supongamos que estás utilizando un modelo de usuario llamado UserModel
    const userId = req.user.userId; // El ID del usuario decodificado desde el token
    const user = await User.findByPk(userId,{
      include : [
        {model: Customer}
      ],
      attributes: {
        exclude: ['contraseña',"id", "customerId", "verificationCode"], // Excluye el campo 'contraseña' del resultado
      },
    });



    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }


    res.json({ message: 'Token válido', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar el usuario' });
  }
}
