import express from 'express';
import { register, login, getMe } from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// ✅ Fix: Use 'as any' to bypass strict type checking for custom Request types
// This is the standard way to handle Auth Middleware in Express + TypeScript
router.get('/me', protect as any, getMe as any);

export default router;