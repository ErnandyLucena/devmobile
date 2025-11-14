import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';

export const ProfileController = {
  async getMyProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const profile = await ProfileService.findByUserId(userId);
      
      if (!profile) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      return res.json(profile);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { nome, telefone, data_nascimento } = req.body;
      const existingProfile = await ProfileService.findByUserId(userId);
      if (!existingProfile) {
        return res.status(404).json({ error: 'Perfil não encontrado' });
      }

      await (ProfileService as any).update(userId, {
        nome,
        telefone,
        data_nascimento: data_nascimento ? new Date(data_nascimento) : undefined
      });

      const updatedProfile = await ProfileService.findByUserId(userId);

      return res.json({
        message: 'Perfil atualizado com sucesso',
        profile: updatedProfile
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
};