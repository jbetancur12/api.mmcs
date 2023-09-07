import jwt from 'jsonwebtoken';
import config from '../config/config.js';


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
  const userId = req.user.userId; // Obtén el ID del usuario autenticado
  const requestedUserId = parseInt(req.params.id); // Obtén el ID del usuario solicitado desde la ruta

  if (userId === requestedUserId || req.user.rol === 'admin') {
    // Si el usuario es el mismo que el solicitado o es un administrador, permite el acceso
    next();
  } else {
    // Si el usuario no es el mismo ni es un administrador, devuelve un error 403 (Prohibido)
    res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
  }
};


