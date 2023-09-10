import { Router } from 'express';
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomerFiles,
  getCustomers,
  updateCustomer
} from '../controllers/customers.controller.js';
import { authenticateJWT, authorizeUserOrAdmin } from '../middlewares/authorizationMiddleware.js';

const router = Router();

// Rutas CRUD para usuarios
router.get('/', getCustomers);
router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id' ,deleteCustomer);
router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getCustomerFiles);


export default router;
