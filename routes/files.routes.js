import { Router } from 'express';
import multer from 'multer';
import { createFile, deleteFile, downloadFile, getFile, getFiles } from '../controllers/files.controller.js';
import { authenticateJWT, authorizeAdmin, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/files', authenticateJWT, authorizeAdmin,getFiles)
router.post('/files', authenticateJWT, authorizeAdmin, upload.single('pdf'), createFile)
// router.put('/files/:id')
router.delete('/files/:id', authenticateJWT, authorizeAdmin, deleteFile)
router.get('/files/:id', authenticateJWT, authorizeAdmin, getFile)
router.get('/files/download/:id', authenticateJWT, authorizeUserOrAdmin, downloadFile)

export default router;