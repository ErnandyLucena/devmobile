import { query, queryOne } from '../config/db';
import { Schedule } from '../models/schedule.model';

export const ScheduleService = {
  async create(schedule: Omit<Schedule, 'id'>): Promise<Schedule> {
    const result = await query<Schedule>(
      'INSERT INTO agenda (medico_id, data_agenda, horario, disponivel) VALUES ($1, $2, $3, $4) RETURNING *',
      [schedule.medico_id, schedule.data_agenda, schedule.horario, schedule.disponivel]
    );
    return result.rows[0];
  },

  async findByDoctorAndDate(medico_id: number, data_agenda: Date): Promise<Schedule[]> {
    const result = await query<Schedule>(
      'SELECT * FROM agenda WHERE medico_id = $1 AND data_agenda = $2 ORDER BY horario',
      [medico_id, data_agenda]
    );
    return result.rows;
  }
};