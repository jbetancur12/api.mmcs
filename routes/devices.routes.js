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
router.get('/devices', getDevices);
router.get('/devices/:id', authenticateJWT, authorizeUserOrAdmin, getDeviceById);
router.post('/devices', createDevice);
router.put('/devices/:id', updateDevice);
router.delete('/devices/:id' ,deleteDevice);
router.get('/devices/:id/files', authenticateJWT, authorizeUserOrAdmin, getDeviceFiles);


export default router;
