import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Dados de entrada inválidos',
      details: error.message
    });
  }

  if (error.code === '23505') {
    return res.status(400).json({
      error: 'Registro duplicado',
      details: 'Já existe um registro com esses dados'
    });
  }

  if (error.code === '23503') {
    return res.status(400).json({
      error: 'Referência inválida',
      details: 'O registro referenciado não existe'
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado'
    });
  }

  res.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor'
  });
};