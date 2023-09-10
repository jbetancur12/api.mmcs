import { Router } from 'express';
import {
  deleteUser,
  getUserById,
  getUserFiles,
  getUsers,
  updateUser
} from '../controllers/users.controller.js';
import { authenticateJWT, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/', getUsers);
router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getUserById);
// router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id' ,deleteUser);
router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getUserFiles);


export default router;
