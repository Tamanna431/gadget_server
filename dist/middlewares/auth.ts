import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // BetterAuth কুকি থেকে টোকেন নিন
    token = req.cookies?.session || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ success: false, message: 'No token, authorization denied' });
      return;
    }

    // টোকেন ভেরিফাই করুন
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    req.user = {
      id: decoded.id || decoded.userId,
      email: decoded.email,
      role: decoded.role || 'user',
    };

    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};