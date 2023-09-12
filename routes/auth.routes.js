import { Router } from 'express';
import { assignRole } from '../controllers/assignRole.controller.js';
import { loginUser, registerUser, validateToken, verifyEmailHandler } from '../controllers/auth.controller.js';
import { authenticateJWT, authorizeAdmin, validateToken as validation } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas de autenticación
router.post('/login', loginUser);
router.post('/register',  authenticateJWT, authorizeAdmin, registerUser);
router.post('/assign-role',  authenticateJWT, authorizeAdmin, assignRole);
router.get('/validateToken',  validation, validateToken);
router.put('/new-password',  verifyEmailHandler);
// router.post('/logout', logoutUser);

export default router;