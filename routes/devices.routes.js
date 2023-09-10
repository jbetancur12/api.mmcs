import { Router } from 'express';
import {
  createDevice,
  deleteDevice,
  getDeviceById,
  getDeviceFiles,
  getDevices,
  updateDevice
} from '../controllers/devices.controller.js';
import { authenticateJWT, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/', getDevices);
router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getDeviceById);
router.post('/', createDevice);
router.put('/:id', updateDevice);
router.delete('/:id' ,deleteDevice);
router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getDeviceFiles);


export default router;
