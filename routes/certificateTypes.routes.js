import { Router } from 'express';
import {
  createCertificateType,
  deleteCertificateType,
  getCertificateTypeById,
  getCertificateTypeFiles,
  getCertificateTypes,
  updateCertificateType
} from '../controllers/certificateTypes.controller.js';
import { authenticateJWT, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/certificateTypes', getCertificateTypes);
router.get('/certificateTypes/:id', authenticateJWT, authorizeUserOrAdmin, getCertificateTypeById);
router.post('/certificateTypes', createCertificateType);
router.put('/certificateTypes/:id', updateCertificateType);
router.delete('/certificateTypes/:id' ,deleteCertificateType);
router.get('/certificateTypes/:id/files', authenticateJWT, authorizeUserOrAdmin, getCertificateTypeFiles);


export default router;
