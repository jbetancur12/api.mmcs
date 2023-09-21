import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/configEnv.js';
// import { User } from '../models/User.js';

import Email from '../helpers/email.js';
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

    const redirectUrl = `${config.frontURL}/new-password?code=${newUser.verificationCode}`
    try {
      await new Email(newUser, redirectUrl).sendVerificationCode()

      // await send({
      //     from: "sender@gmail.com",
      //     to: "jorge.betancur@teads.tv",
      //     subject: "test",
      //     text: "Hola MUndo"
      // })

      // res.status(201).json({
      //   status: 'success',
      //   message:
      //     'An email with a verification code has been sent to your email',
      // });
    } catch (error) {
      user.verificationCode = null
      await user.save()

      // return res.status(500).json({
      //   status: 'error',
      //   message: 'There was an error sending email, please try again',
      // });
    }



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

    if (!user.active) {
      return res.status(400).send({ message: 'You are not verified' })
    }

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

export const verifyEmailHandler = async (req, res, next) => {
  console.log("🚀 ~ file: auth.controller.js:148 ~ verifyEmailHandler ~ req.params.verificationCode:", req.query)

  try {
    const user = await User.findOne({
      where: {
        verificationCode: req.query.code,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'No se pudo verificar' });
    }

    // Update user properties
    user.active = true;
    user.password = req.body.newPassword;
    user.verificationCode = null;

    // Save changes
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}

const recoverPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'El correo electronico no existe' });
    }

    const verificationCode = `${Math.floor(1000 + Math.random() * 9000)}`;

    // Update user's verification code
    await user.update({ verificationCode });

    const redirectUrl = `${process.env.FRONTEND_URL}/auth/new-password?code=${verificationCode}`;

    try {
      await new Email(user, redirectUrl).sendVerificationCode(
        'resetPassword',
        'Reset Password'
      );
      res.status(201).json({
        status: 'success',
        message: 'An email with a verification code has been sent to your email',
      });
    } catch (error) {
      // Handle email sending error
      user.verificationCode = null;
      await user.save();
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email, please try again',
      });
    }
  } catch (error) {
    res.status(500).json({error: err.message});
  }
};
