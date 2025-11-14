import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, cpf, tipo } = req.body; 

  if (!email || !password || !name || !cpf || !tipo) {
    return res.status(400).json({ 
      error: 'Email, password, name, CPF e tipo são obrigatórios' 
    });
  }

  if (!['medico', 'paciente', 'funcionario'].includes(tipo)) {
    return res.status(400).json({ 
      error: 'Tipo deve ser: medico, paciente ou funcionario' 
    });
  }

  if (tipo === 'medico' && !req.body.crm) {
    return res.status(400).json({ error: 'CRM é obrigatório para médicos' });
  }

  if (tipo === 'funcionario' && (!req.body.setor || !req.body.cargo)) {
    return res.status(400).json({ 
      error: 'Setor e cargo são obrigatórios para funcionários' 
    });
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      error: 'Email e password são obrigatórios' 
    });
  }

  next();
};

export const validateAppointment = (req: Request, res: Response, next: NextFunction) => {
  const { paciente_id, medico_id, data_consulta } = req.body;

  if (!paciente_id || !medico_id || !data_consulta) {
    return res.status(400).json({ 
      error: 'Paciente, médico e data da consulta são obrigatórios' 
    });
  }

  next();
};