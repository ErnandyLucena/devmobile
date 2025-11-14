import { Request, Response } from 'express';
import { DoctorService } from '../services/doctor.service';

export const DoctorController = {
  async listAll(req: Request, res: Response) {
    try {
      const doctors = await DoctorService.listAll();
      
      return res.json({
        doctors,
        total: doctors.length
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getByUserId(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const doctor = await DoctorService.findByUserId(userId);
      
      if (!doctor) {
        return res.status(404).json({ error: 'Médico não encontrado' });
      }

      return res.json(doctor);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Criar médico
  async create(req: Request, res: Response) {
    try {
      const { usuario_id, crm, especialidade, ativo } = req.body;

      if (!usuario_id || !crm || !especialidade) {
        return res.status(400).json({ 
          error: 'usuario_id, CRM e especialidade são obrigatórios' 
        });
      }

      const doctor = await DoctorService.create({
        usuario_id,
        crm,
        especialidade,
        ativo: ativo !== undefined ? ativo : true
      });

      return res.status(201).json({
        message: 'Médico criado com sucesso',
        doctor
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
};