import { query, queryOne } from '../config/db';
import { Patient } from '../models/patient.model';

export const PatientService = {
  async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const result = await query<Patient>(
      'INSERT INTO pacientes (usuario_id, convenio, alergias) VALUES ($1, $2, $3) RETURNING *',
      [patient.usuario_id, patient.convenio, patient.alergias]
    );
    return result.rows[0];
  },

  async findByUserId(usuario_id: number): Promise<Patient | null> {
    return await queryOne<Patient>(
      'SELECT * FROM pacientes WHERE usuario_id = $1',
      [usuario_id]
    );
  }
};