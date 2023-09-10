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
router.get('/', getCertificateTypes);
router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getCertificateTypeById);
router.post('/', createCertificateType);
router.put('/:id', updateCertificateType);
router.delete('/:id' ,deleteCertificateType);
router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getCertificateTypeFiles);


export default router;
