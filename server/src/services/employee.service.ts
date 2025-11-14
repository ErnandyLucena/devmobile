import { query, queryOne } from '../config/db';
import { Employee } from '../models/employee.model';

export const EmployeeService = {
  async create(employee: Omit<Employee, 'id'>): Promise<Employee> {
    const result = await query<Employee>(
      'INSERT INTO funcionarios (usuario_id, setor, cargo, data_admissao) VALUES ($1, $2, $3, $4) RETURNING *',
      [employee.usuario_id, employee.setor, employee.cargo, employee.data_admissao]
    );
    return result.rows[0];
  },

  async findByUserId(usuario_id: number): Promise<Employee | null> {
    return await queryOne<Employee>(
      'SELECT * FROM funcionarios WHERE usuario_id = $1',
      [usuario_id]
    );
  }
};