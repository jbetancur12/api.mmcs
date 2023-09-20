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

const router = Router();

// Rutas CRUD para usuarios
// router.get('/',  authenticateJWT, authorizeAdmin, getCustomers);
// router.get('/:id', authenticateJWT, authorizeUserOrAdmin, getCustomerById);
// router.post('/',  authenticateJWT, authorizeAdmin,createCustomer);
// router.put('/:id',  authenticateJWT, authorizeAdmin, updateCustomer);
// router.delete('/:id' ,  authenticateJWT, authorizeAdmin, deleteCustomer);
// router.get('/:id/files', authenticateJWT, authorizeUserOrAdmin, getCustomerFiles);
// router.get('/:id/users', authenticateJWT, getCustomerUsers);

router.get('/',  getCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id',  updateCustomer);
router.delete('/:id' ,  deleteCustomer);
router.get('/:id/files', getCustomerFiles);
router.get('/:id/users',  getCustomerUsers);


export default router;
