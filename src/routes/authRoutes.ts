import express from 'express';
import { register, login, getMe } from '../controllers/authController';
import { protect, AuthRequest } from '../middlewares/auth';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect as unknown as (req: Request, res: Response, next: NextFunction) => void, getMe);

export default router;