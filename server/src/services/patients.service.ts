import db from "../db";

export const PatientsService = {
  async create({ nome, cpf, email, telefone }: { nome: string; cpf: string; email: string; telefone?: string | null }) {
    // checar duplicados
    const existingCpf = await db.runGet("SELECT id FROM patients WHERE cpf = ? LIMIT 1", [cpf]);
    if (existingCpf) throw new Error("CPF já cadastrado");
    const existingEmail = await db.runGet("SELECT id FROM patients WHERE email = ? LIMIT 1", [email]);
    if (existingEmail) throw new Error("E-mail já cadastrado");

    await db.run(`INSERT INTO patients (nome, cpf, email, telefone, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`, [
      nome,
      cpf,
      email,
      telefone || null,
      new Date().toISOString(),
      new Date().toISOString(),
    ]);

    const row = await db.runGet("SELECT last_insert_rowid() as id");
    const id = row ? Number((row as any).id) : NaN;
    const created = await db.runGet(`SELECT * FROM patients WHERE id = ? LIMIT 1`, [id]);
    return created;
  },
  async list({ page = 1, limit = 20, q }: { page?: number; limit?: number; q?: string }) {
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let where = "WHERE 1=1";
    if (q) {
      where += " AND (nome LIKE ? OR email LIKE ? OR cpf LIKE ?)";
      params.push(`%${q}%`, `%${q}%`, `%${q}%`);
    }

    const totalRow = await db.runGet(`SELECT COUNT(1) as cnt FROM patients ${where}`, params);
    const total = totalRow ? Number((totalRow as any).cnt) : 0;

    params.push(limit, offset);
    const items = await db.run(`SELECT * FROM patients ${where} ORDER BY nome LIMIT ? OFFSET ?`, params);
    return { total, page, limit, items };
  },
  async getById(id: number) {
    return db.runGet(`SELECT * FROM patients WHERE id = ? LIMIT 1`, [id]);
  },
};

export default PatientsService;
