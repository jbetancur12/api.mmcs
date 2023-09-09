import { Device } from '../models/Device.js';
import { File } from '../models/File.js';

// Obtener todos los usuarios
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
export const getDeviceById = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findByPk(id, {
      attributes: {
        exclude: ['contraseña',"id"], // Excluye el campo 'contraseña' del resultado
      },
    });
    if (device) {
      res.status(200).json(device);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
};

//Crear un nuevo equipo
export const createDevice = async (req, res) => {
  const deviceData = req.body;
  console.log("🚀 ~ file: devices.controller.js:36 ~ createDevice ~ deviceData:", deviceData)
  try {
    const newDevice = await Device.create(deviceData);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear equipo' });
  }
};

// Actualizar un usuario por ID
export const updateDevice = async (req, res) => {
  const { id } = req.params;
  const updatedDeviceData = req.body;
  try {
    const device = await Device.findByPk(id);
    if (device) {
      await device.update(updatedDeviceData);
      res.status(200).json(device);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario por ID
export const deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findByPk(id);
    if (device) {
      await device.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};


export const getDeviceFiles = async (req, res) => {
  const { id } = req.params
  const files = await File.findAll({
    where: { deviceId: id }
  })

  res.json(files)
}
