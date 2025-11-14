import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';

export const AppointmentController = {
  async create(req: Request, res: Response) {
    try {
      const { paciente_id, medico_id, data_consulta, observacoes } = req.body;

      const appointment = await AppointmentService.create({
        paciente_id,
        medico_id,
        data_consulta: new Date(data_consulta),
        status: 'agendada',
        observacoes
      });

      return res.status(201).json({
        message: 'Consulta agendada com sucesso',
        appointment
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getMyAppointments(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const userType = (req as any).userType; 
      let appointments;
      
      if (userType === 'paciente') {
        appointments = await AppointmentService.findByPatientId(userId);
      } else if (userType === 'medico') {
        appointments = await AppointmentService.findByDoctorId(userId);
      } else {
        return res.status(400).json({ error: 'Tipo de usuário não suportado' });
      }

      return res.json({
        appointments,
        total: appointments.length
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};