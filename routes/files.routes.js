import { Router } from 'express';
import multer from 'multer';
import { createFile, deleteFile, getFile, getFiles } from '../controllers/files.controller.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/files', getFiles)
router.post('/files', upload.single('pdf'),createFile)
router.put('/files/:id')
router.delete('/files/:id', deleteFile)
router.get('/files/:id',getFile)

export default router;