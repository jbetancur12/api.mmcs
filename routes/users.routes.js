import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUserFiles,
  getUsers,
  updateUser
} from '../controllers/users.controller.js';
import { authenticateJWT, authorizeAdmin, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/users', getUsers);
router.get('/users/:id', authenticateJWT, authorizeUserOrAdmin, getUserById);
// router.post('/users', createUser);
router.put('/users/:id', authenticateJWT, authorizeAdmin, updateUser);
router.delete('/users/:id', authenticateJWT, authorizeAdmin ,deleteUser);
router.get('/users/:id/files', authenticateJWT, authorizeUserOrAdmin, getUserFiles);


export default router;
