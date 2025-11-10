import { UserModel } from "../models/user.model";
import { HashUtil } from "../utils/hash.util";
import { JwtUtil } from "../utils/jwt.util";
import db from "../db";

export const AuthService = {
  async register({
    name,
    email,
    cpf,
    isDoctor,
    sector,
    idFuncionario,
    cargo,
    dataAdmissao,
    status,
    cdPrestador,
    nmPrestador,
    nmMnemonico,
    dsCodigoConselho,
    dsCRM,
    especialidade,
    password,
  }: {
    name?: string;
    email: string;
    cpf: string;
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
    password: string;
  }) {
    const existingEmail = await UserModel.findByEmail(email);
    if (existingEmail) throw new Error("E-mail já cadastrado");
    const existingCpf = await db.runGet(
      "SELECT id FROM users WHERE cpf = ? LIMIT 1",
      [cpf]
    );
    if (existingCpf) throw new Error("CPF já cadastrado");

    const passwordHash = await HashUtil.hash(password);

    await db.beginTransaction();
    try {
      await db.run(
        `INSERT INTO users (
          name, cpf, email, passwordHash, role, isDoctor, sector,
          idFuncionario, cargo, dataAdmissao, status,
          cdPrestador, nmPrestador, nmMnemonico, dsCodigoConselho, dsCRM, especialidade,
          emailVerified, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name || null,
          cpf,
          email,
          passwordHash,
          "user",
          isDoctor ? 1 : 0,
          isDoctor ? null : sector || null,
          idFuncionario || null,
          cargo || null,
          dataAdmissao || null,
          status || null,
          cdPrestador || null,
          nmPrestador || null,
          nmMnemonico || null,
          dsCodigoConselho || null,
          dsCRM || null,
          especialidade || null,
          0,
          new Date().toISOString(),
          new Date().toISOString(),
        ]
      );
      const row = await db.runGet("SELECT last_insert_rowid() as id");
      const userId = row ? Number((row as any).id) : NaN;

      await db.commitTransaction();
      const created = await UserModel.findById(userId);
      return { id: created!.id, name: created!.name, email: created!.email };
    } catch (err) {
      try {
        await db.rollbackTransaction();
      } catch (_) {}
      throw err;
    }
  },

  async login({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Credenciais inválidas");
    const match = await HashUtil.compare(password, user.passwordHash);
    if (!match) throw new Error("Credenciais inválidas");
    const token = JwtUtil.sign({ sub: String(user.id), email: user.email });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  },

  async me(userId: number | string) {
    const user = await UserModel.findById(
      typeof userId === "string" ? Number(userId) : userId
    );
    if (!user) throw new Error("Usuário não encontrado");
    return { id: user.id, name: user.name, email: user.email };
  },
};
