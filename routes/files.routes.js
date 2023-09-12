import { Router } from 'express';
import multer from 'multer';
import { createFile, deleteFile, downloadFile, getFile, getFiles } from '../controllers/files.controller.js';
import { authenticateJWT, authorizeAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',  authenticateJWT, getFiles)
router.post('/', upload.single('pdf'), authenticateJWT, authorizeAdmin, createFile)
// router.put('//:id')
// router.delete('//:id', authenticateJWT, authorizeAdmin, deleteFile)
router.delete('/:id', authenticateJWT, authorizeAdmin, deleteFile)
router.get('/:id',  authenticateJWT, authorizeAdmin, getFile)
router.get('/download/:id',  downloadFile)

export default router;