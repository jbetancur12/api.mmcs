import { User } from '../models/User.js';

export const assignRole = async (req, res) => {
  const { userId, newRole } = req.body;

  // Verificar si el usuario que realiza la solicitud tiene permiso para asignar roles
  if (!userIsAuthorized(req.user)) {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
  }


  if(userId === req.user.userId){
    return res.status(403).json({ error: 'No puedes modificar tu mismo Usuario' });
  }

  try {
    // Validar que el nuevo rol sea válido antes de asignarlo
    if (!isValidRole(newRole)) {
      return res.status(400).json({ error: 'El rol especificado no es válido' });
    }

    // Realizar la asignación de rol
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if(user.rol === newRole){
      return res.status(403).json({ error: 'El usuario ya tiene el rol asignado' });
    }

    user.rol = newRole;
    await user.save();

    res.status(200).json({ mensaje: 'Rol asignado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al asignar el rol' });
  }
};

// Función para verificar si el usuario tiene permiso para asignar roles
const userIsAuthorized = (user) => {
  // Implementa tu lógica de autorización aquí, por ejemplo, verifica si el usuario es un administrador.
  // Devuelve true si está autorizado, de lo contrario, devuelve false.
  return user && user.rol === 'admin';
};

// Función para validar si un rol es válido
const isValidRole = (rol) => {
  console.log("🚀 ~ file: assignRole.controller.js:41 ~ isValidRole ~ rol:", rol)
  // Implementa tu lógica de validación de roles aquí. Puede ser una lista de roles válidos o cualquier otro criterio que desees.
  return ['admin', 'user'].includes(rol);
};
