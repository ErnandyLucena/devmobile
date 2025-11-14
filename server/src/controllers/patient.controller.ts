import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';

export const PatientController = {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const patient = await PatientService.findByUserId(userId);
      
      if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }

      return res.json(patient);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};