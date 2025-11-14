import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token de acesso não fornecido' });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    const decoded = JwtUtil.verify(token) as any;
    
    (req as any).userId = decoded.userId;
    (req as any).userEmail = decoded.email;
    (req as any).userType = decoded.tipo;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};