import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.post('/register', isAdmin, register);

router.post('/login', login);

export default router;
