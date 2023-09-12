import { Router } from 'express';
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomerFiles,
  getCustomerUsers,
  getCustomers,
  updateCustomer
} from '../controllers/customers.controller.js';
import { authenticateJWT, authorizeAdmin, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/',  authenticateJWT, authorizeAdmin, getCustomers);
router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getCustomerById);
router.post('/',  authenticateJWT, authorizeAdmin,createCustomer);
router.put('/:id',  authenticateJWT, authorizeAdmin, updateCustomer);
router.delete('/:id' ,  authenticateJWT, authorizeAdmin, deleteCustomer);
router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getCustomerFiles);
router.get('/:id/users', authenticateJWT, getCustomerUsers);


export default router;
