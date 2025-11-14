import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name, cpf, tipo, crm, especialidade, setor, cargo, data_admissao, convenio } = req.body;

      const result = await AuthService.register({
        email,
        password,
        name,
        cpf,
        tipo,
        crm,
        especialidade,
        setor,
        cargo,
        data_admissao,
        convenio
      });

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: result
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      return res.json({
        message: 'Login realizado com sucesso',
        ...result
      });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  },

  async getMe(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const user = await AuthService.getMe(userId);
      
      return res.json(user);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
};