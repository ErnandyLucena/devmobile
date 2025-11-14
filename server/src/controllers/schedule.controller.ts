import { Request, Response } from 'express';
import { ScheduleService } from '../services/schedule.service';

export const ScheduleController = {
  async getByDoctorAndDate(req: Request, res: Response) {
    try {
      const { medico_id, data } = req.query;
      
      if (!medico_id || !data) {
        return res.status(400).json({ error: 'Médico ID e data são obrigatórios' });
      }

      const schedules = await ScheduleService.findByDoctorAndDate(
        Number(medico_id),
        new Date(data as string)
      );

      return res.json({
        schedules,
        total: schedules.length
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};