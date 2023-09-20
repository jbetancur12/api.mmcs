import { Router } from 'express';
import { contactForm } from '../controllers/mail.controller.js';

const router = Router();

router.post('/',  contactForm);

export default router;