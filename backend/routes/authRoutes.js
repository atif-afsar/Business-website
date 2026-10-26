import express from 'express';
import { login, getMe } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Admin login
router.post('/login', login);

// Protected: Get current admin info
router.get('/me', protectAdmin, getMe);

export default router;
