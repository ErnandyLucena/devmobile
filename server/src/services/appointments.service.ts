import db from "../db";

export const AppointmentsService = {
  async create({
    data,
    horaInicio,
    horaFim,
    status,
    tipoAgendamento,
    observacoes,
    pacienteId,
    medicoCdPrestador,
  }: {
    data: string;
    horaInicio: string;
    horaFim: string;
    status?: string | null;
    tipoAgendamento?: string | null;
    observacoes?: string | null;
    pacienteId: number;
    medicoCdPrestador: number;
  }) {
    // validar paciente
    const pacienteRow = await db.runGet(`SELECT * FROM patients WHERE id = ? LIMIT 1`, [
      pacienteId,
    ]);
    if (!pacienteRow) throw new Error("Paciente não encontrado");
    const pacienteNome = (pacienteRow as any).nome || null;

    // validar prestador (médico) pelo cdPrestador na tabela users
    const medicoRow = await db.runGet(`SELECT * FROM users WHERE cdPrestador = ? LIMIT 1`, [
      medicoCdPrestador,
    ]);
    if (!medicoRow) throw new Error("Prestador não encontrado");
  // priorizar o nome real do usuário (name) em vez de nmPrestador
  const medicoNome = (medicoRow as any).name || (medicoRow as any).nmPrestador || null;
  const especialidade = (medicoRow as any).especialidade || null;

    await db.run(`INSERT INTO appointments (
      data, horaInicio, horaFim, status, tipoAgendamento, observacoes, pacienteId, pacienteNome, medicoCdPrestador, medicoNome, especialidade, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      data,
      horaInicio,
      horaFim,
      status || null,
      tipoAgendamento || null,
      observacoes || null,
      pacienteId,
      pacienteNome,
      medicoCdPrestador,
      medicoNome,
      especialidade,
      new Date().toISOString(),
      new Date().toISOString(),
    ]);

    const row = await db.runGet("SELECT last_insert_rowid() as id");
    const id = row ? Number((row as any).id) : NaN;
    const created = await db.runGet(`SELECT * FROM appointments WHERE id = ? LIMIT 1`, [id]);
    return created;
  },
  async list({
    page = 1,
    limit = 20,
    date,
    pacienteId,
    medicoCdPrestador,
    status,
  }: {
    page?: number;
    limit?: number;
    date?: string;
    pacienteId?: number;
    medicoCdPrestador?: number;
    status?: string;
  }) {
    const offset = (page - 1) * limit;
    const params: any[] = [];
    let where = "WHERE 1=1";

    if (date) {
      where += " AND data = ?";
      params.push(date);
    }
    if (typeof pacienteId !== "undefined") {
      where += " AND pacienteId = ?";
      params.push(pacienteId);
    }
    if (typeof medicoCdPrestador !== "undefined") {
      where += " AND medicoCdPrestador = ?";
      params.push(medicoCdPrestador);
    }
    if (status) {
      where += " AND status = ?";
      params.push(status);
    }

    const totalRow = await db.runGet(`SELECT COUNT(1) as cnt FROM appointments ${where}`, params);
    const total = totalRow ? Number((totalRow as any).cnt) : 0;

    params.push(limit, offset);
    const items = await db.run(
      `SELECT * FROM appointments ${where} ORDER BY data, horaInicio LIMIT ? OFFSET ?`,
      params
    );
    return { total, page, limit, items };
  },
  async update(id: number, fields: any) {
    const sets: string[] = [];
    const params: any[] = [];

    // se trocar pacienteId, validar existência e setar pacienteNome
    if (typeof fields.pacienteId !== "undefined") {
      const p = await db.runGet(`SELECT * FROM patients WHERE id = ? LIMIT 1`, [fields.pacienteId]);
      if (!p) throw new Error("Paciente não encontrado");
      fields.pacienteNome = (p as any).nome || null;
    }
    // se trocar medicoCdPrestador, validar e setar medicoNome/especialidade
    if (typeof fields.medicoCdPrestador !== "undefined") {
      const m = await db.runGet(`SELECT * FROM users WHERE cdPrestador = ? LIMIT 1`, [fields.medicoCdPrestador]);
      if (!m) throw new Error("Prestador não encontrado");
      // priorizar o nome real do usuário (name)
      fields.medicoNome = (m as any).name || (m as any).nmPrestador || null;
      fields.especialidade = (m as any).especialidade || null;
    }

    for (const key of Object.keys(fields)) {
      sets.push(`${key} = ?`);
      params.push(fields[key]);
    }
    if (sets.length === 0) return null;
    params.push(new Date().toISOString());
    params.push(id);
    const sql = `UPDATE appointments SET ${sets.join(", ")}, updatedAt = ? WHERE id = ?`;
    await db.run(sql, params);
    const updated = await db.runGet(`SELECT * FROM appointments WHERE id = ? LIMIT 1`, [id]);
    return updated;
  },
};

export default AppointmentsService;
