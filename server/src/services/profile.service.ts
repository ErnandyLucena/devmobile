import { query, queryOne } from '../config/db';
import { Profile } from '../models/profile.model';

export const ProfileService = {
  async create(profile: Omit<Profile, 'id'>): Promise<Profile> {
    const result = await query<Profile>(
      'INSERT INTO perfis (usuario_id, nome, cpf, telefone, data_nascimento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [profile.usuario_id, profile.nome, profile.cpf, profile.telefone, profile.data_nascimento]
    );
    return result.rows[0];
  },

  async findByUserId(usuario_id: number): Promise<Profile | null> {
    return await queryOne<Profile>(
      'SELECT * FROM perfis WHERE usuario_id = $1',
      [usuario_id]
    );
  }
};