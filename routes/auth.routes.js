import { Router } from 'express';
import { assignRole } from '../controllers/assignRole.controller.js';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import { authenticateJWT, authorizeAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas de autenticación
router.post('/auth/login', loginUser);
router.post('/auth/register', registerUser);
router.post('/auth/assign-role',  authenticateJWT, authorizeAdmin, assignRole);
// router.post('/logout', logoutUser);

export default router;