import { query, queryOne } from '../config/db';
import { User } from '../models/user.model';

export const UserService = {
  async create(user: Omit<User, 'id' | 'data_criacao'>): Promise<User> {
    const result = await query<User>(
      'INSERT INTO usuarios (email, password_hash, tipo) VALUES ($1, $2, $3) RETURNING *',
      [user.email, user.password_hash, user.tipo]
    );
    return result.rows[0];
  },

  async findByEmail(email: string): Promise<User | null> {
    return await queryOne<User>(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );
  },

  async findById(id: number): Promise<User | null> {
    return await queryOne<User>(
      'SELECT * FROM usuarios WHERE id = $1',
      [id]
    );
  }
};