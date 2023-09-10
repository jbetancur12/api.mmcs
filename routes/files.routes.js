import { Router } from 'express';
import multer from 'multer';
import { createFile, deleteFile, downloadFile, getFile, getFiles } from '../controllers/files.controller.js';
import { authenticateJWT, authorizeAdmin, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/files', authenticateJWT, authorizeUserOrAdmin, getFiles)
router.post('/files', upload.single('pdf'), authenticateJWT, authorizeAdmin, createFile)
// router.put('/files/:id')
// router.delete('/files/:id', authenticateJWT, authorizeAdmin, deleteFile)
router.delete('/files/:id', authenticateJWT, authorizeAdmin, deleteFile)
router.get('/files/:id',  authenticateJWT, authorizeAdmin, getFile)
router.get('/files/download/:id', authenticateJWT, authorizeAdmin, downloadFile)

export default router;