import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const UserController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const user = await UserService.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};