export interface User {
  id: number;
  name?: string;
  cpf?: string;
  email: string;
  passwordHash: string;
  role?: string;
  isDoctor?: boolean;
  sector?: string | null;
  idFuncionario?: number | null;
  cargo?: string | null;
  dataAdmissao?: string | null;
  status?: string | null;
  cdPrestador?: number | null;
  nmPrestador?: string | null;
  nmMnemonico?: string | null;
  dsCodigoConselho?: string | null;
  dsCRM?: string | null;
  especialidade?: string | null;
  emailVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
}

import db from "../db";

export const UserModel = {
  async create(user: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const createdAt = new Date().toISOString();
    await db.run(
      `INSERT INTO users (
        name, cpf, email, passwordHash, role, isDoctor, sector,
        idFuncionario, cargo, dataAdmissao, status,
        cdPrestador, nmPrestador, nmMnemonico, dsCodigoConselho, dsCRM, especialidade,
        emailVerified, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name || null,
        (user as any).cpf || null,
        user.email,
        user.passwordHash,
        user.role || "user",
        (user as any).isDoctor ? 1 : 0,
        (user as any).sector || null,
        (user as any).idFuncionario || null,
        (user as any).cargo || null,
        (user as any).dataAdmissao || null,
        (user as any).status || null,
        (user as any).cdPrestador || null,
        (user as any).nmPrestador || null,
        (user as any).nmMnemonico || null,
        (user as any).dsCodigoConselho || null,
        (user as any).dsCRM || null,
        (user as any).especialidade || null,
        user.emailVerified ? 1 : 0,
        createdAt,
        createdAt,
      ]
    );
    const row = await db.runGet(`SELECT last_insert_rowid() as id`);
    const id = row ? Number((row as any).id) : NaN;
    return {
      id,
      name: user.name,
      cpf: (user as any).cpf,
      email: user.email,
      passwordHash: user.passwordHash,
      role: user.role,
      isDoctor: (user as any).isDoctor,
      sector: (user as any).sector || null,
      idFuncionario: (user as any).idFuncionario || null,
      cargo: (user as any).cargo || null,
      dataAdmissao: (user as any).dataAdmissao || null,
      cdPrestador: (user as any).cdPrestador || null,
      status: (user as any).status || null,
      nmPrestador: (user as any).nmPrestador || null,
      nmMnemonico: (user as any).nmMnemonico || null,
      dsCodigoConselho: (user as any).dsCodigoConselho || null,
      dsCRM: (user as any).dsCRM || null,
      especialidade: (user as any).especialidade || null,
      emailVerified: !!user.emailVerified,
      createdAt,
    } as User;
  },

  async findByEmail(email: string) {
    const row = await db.runGet(`SELECT * FROM users WHERE email = ? LIMIT 1`, [
      email,
    ]);
    if (!row) return null;
    const r = row as any;
    return {
      id: r.id,
      name: r.name,
      cpf: r.cpf,
      email: r.email,
      passwordHash: r.passwordHash,
      role: r.role,
      isDoctor: !!r.isDoctor,
      sector: r.sector,
      idFuncionario: r.idFuncionario,
      cargo: r.cargo,
      dataAdmissao: r.dataAdmissao,
      status: r.status,
      cdPrestador: r.cdPrestador,
      nmPrestador: r.nmPrestador,
      nmMnemonico: r.nmMnemonico,
      dsCodigoConselho: r.dsCodigoConselho,
      dsCRM: r.dsCRM,
      especialidade: r.especialidade,
      emailVerified: !!r.emailVerified,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    } as User;
  },

  async findById(id: number | string) {
    const row = await db.runGet(`SELECT * FROM users WHERE id = ? LIMIT 1`, [
      id,
    ]);
    if (!row) return null;
    const r = row as any;
    return {
      id: r.id,
      name: r.name,
      cpf: r.cpf,
      email: r.email,
      passwordHash: r.passwordHash,
      role: r.role,
      isDoctor: !!r.isDoctor,
      sector: r.sector,
      idFuncionario: r.idFuncionario,
      cargo: r.cargo,
      dataAdmissao: r.dataAdmissao,
      status: r.status,
      cdPrestador: r.cdPrestador,
      nmPrestador: r.nmPrestador,
      nmMnemonico: r.nmMnemonico,
      dsCodigoConselho: r.dsCodigoConselho,
      dsCRM: r.dsCRM,
      especialidade: r.especialidade,
      emailVerified: !!r.emailVerified,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    } as User;
  },
};
