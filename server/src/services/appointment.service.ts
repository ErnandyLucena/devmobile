import { query, queryOne } from '../config/db';
import { Appointment } from '../models/appointment.model';

export const AppointmentService = {
  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    const result = await query<Appointment>(
      'INSERT INTO consultas (paciente_id, medico_id, data_consulta, status, observacoes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [appointment.paciente_id, appointment.medico_id, appointment.data_consulta, appointment.status, appointment.observacoes]
    );
    return result.rows[0];
  },

  async findByPatientId(paciente_id: number): Promise<Appointment[]> {
    const result = await query<Appointment>(
      'SELECT * FROM consultas WHERE paciente_id = $1 ORDER BY data_consulta DESC',
      [paciente_id]
    );
    return result.rows;
  },

  async findByDoctorId(medico_id: number): Promise<Appointment[]> {
    const result = await query<Appointment>(
      'SELECT * FROM consultas WHERE medico_id = $1 ORDER BY data_consulta DESC',
      [medico_id]
    );
    return result.rows;
  }
};