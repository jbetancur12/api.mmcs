import jwt from 'jsonwebtoken';
import config from '../config/configEnv.js';


export const authenticateJWT = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Almacena la información del usuario en req.user para su uso posterior
    req.user = user;
    next();
  });
};

export const authorizeAdmin = (req, res, next) => {
  // Verificar si el usuario tiene permisos de administrador

  if (req.user && req.user.rol === 'admin') {
    // Si el usuario es un administrador, permite que la solicitud continúe
    next();
  } else {
    // Si el usuario no es un administrador, devuelve un error 403 (Prohibido)
    res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
  }
};

export const authorizeUserOrAdmin = (req, res, next) => {
  console.log(req.user)
  const userId = req.user.userId; // Obtén el ID del usuario autenticado
  const requestedUserId = parseInt(req.params.id); // Obtén el ID del usuario solicitado desde la ruta

  if (req.user.rol === 'user' || req.user.rol === 'admin') {
    // Si el usuario es el mismo que el solicitado o es un administrador, permite el acceso
    next();
  } else {
    // Si el usuario no es el mismo ni es un administrador, devuelve un error 403 (Prohibido)
    res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
  }
};


export const validateToken = (req, res, next) => {
  let token = req.header('Authorization');


  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Guardar los datos del usuario en el objeto de solicitud para su posterior uso
    next(); // Continuar con la siguiente función middleware
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
}

