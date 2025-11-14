import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_jwt_secret_aqui_mudar_em_producao';
const EXPIRES_IN = '7d'; 

export const JwtUtil = {
  sign(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  },

  verify<T = any>(token: string): T {
    return jwt.verify(token, JWT_SECRET) as T;
  }
};