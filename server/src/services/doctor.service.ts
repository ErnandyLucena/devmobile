import { query, queryOne } from '../config/db';
import { Doctor } from '../models/doctor.model';

export const DoctorService = {
  async create(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    const result = await query<Doctor>(
      'INSERT INTO medicos (usuario_id, crm, especialidade, ativo) VALUES ($1, $2, $3, $4) RETURNING *',
      [doctor.usuario_id, doctor.crm, doctor.especialidade, doctor.ativo]
    );
    return result.rows[0];
  },

  async findByUserId(usuario_id: number): Promise<Doctor | null> {
    return await queryOne<Doctor>(
      'SELECT * FROM medicos WHERE usuario_id = $1',
      [usuario_id]
    );
  },

  async listAll(): Promise<Doctor[]> {
    const result = await query<Doctor>(
      'SELECT * FROM medicos ORDER BY id'
    );
    return result.rows;
  }
};