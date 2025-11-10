import db from "../db";
import { UserModel } from "../models/user.model";

export const UsersService = {
  async listDoctors({
    page = 1,
    limit = 20,
    specialty,
    q,
  }: {
    page?: number;
    limit?: number;
    specialty?: string;
    q?: string;
  }) {
    const offset = (page - 1) * limit;
    const params: any[] = [1]; // isDoctor = 1
    let where = "WHERE isDoctor = ?";

    if (specialty) {
      where += " AND especialidade = ?";
      params.push(specialty);
    }
    if (q) {
      where += " AND (name LIKE ? OR email LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    // contar total (opcional)
    const totalRow = await db.runGet(
      `SELECT COUNT(1) as cnt FROM users ${where}`,
      params
    );
    const total = totalRow ? Number((totalRow as any).cnt) : 0;

    // selecionar página
    params.push(limit, offset);
    const rows = await db.run(
      `SELECT * FROM users ${where} ORDER BY name LIMIT ? OFFSET ?`,
      params
    );
    return { total, page, limit, items: rows };
  },

  async listEmployees({
    page = 1,
    limit = 20,
    sector,
    status,
    q,
  }: {
    page?: number;
    limit?: number;
    sector?: string;
    status?: string;
    q?: string;
  }) {
    const offset = (page - 1) * limit;
    const params: any[] = [0]; // isDoctor = 0
    let where = "WHERE isDoctor = ?";

    if (sector) {
      where += " AND (sector = ? OR setor = ?)";
      params.push(sector, sector);
    }
    if (status) {
      where += " AND status = ?";
      params.push(status);
    }
    if (q) {
      where += " AND (name LIKE ? OR email LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    const totalRow = await db.runGet(
      `SELECT COUNT(1) as cnt FROM users ${where}`,
      params
    );
    const total = totalRow ? Number((totalRow as any).cnt) : 0;

    params.push(limit, offset);
    const rows = await db.run(
      `SELECT * FROM users ${where} ORDER BY name LIMIT ? OFFSET ?`,
      params
    );
    return { total, page, limit, items: rows };
  },

  async getById(id: number) {
    return UserModel.findById(id);
  },
};
