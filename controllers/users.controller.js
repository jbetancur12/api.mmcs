import { Op } from 'sequelize';
import { File } from '../models/File.js';
import { User } from '../models/User.js';

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const { q } = req.query; // Obtiene el parámetro de búsqueda "q" de la consulta

    if (q) {
      // Si se proporciona un valor de búsqueda, realiza una búsqueda filtrada
      const filteredUsers = await User.findAll({
        where: {
          // Define las condiciones de búsqueda aquí, por ejemplo, para buscar por nombre
          nombre: {
            [Op.like]: `%${q}%`, // Utiliza el operador LIKE para buscar coincidencias parciales
          },
        },
      });

      res.status(200).json(filteredUsers);
    } else {
      // Si no se proporciona un valor de búsqueda, obtén todos los usuarios
      const users = await User.findAll();
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['contraseña',"id"], // Excluye el campo 'contraseña' del resultado
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
};

// Crear un nuevo usuario
// export const createUser = async (req, res) => {
//   const userData = req.body;
//   try {
//     const newUser = await User.create(userData);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear usuario' });
//   }
// };

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(updatedUserData);
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};


export const getUserFiles = async (req, res) => {
  const { id } = req.params
  const files = await File.findAll({
    where: { userId: id }
  })

  res.json(files)
}
