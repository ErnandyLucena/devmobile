import type { Database } from "sql.js";

const initSqlJs: any = require("sql.js");
import fs from "fs";
import path from "path";

const DB_FILE = process.env.DATABASE_FILE || path.resolve(__dirname, "dev.db");
let SQL: any = null;
let db: Database | null = null;

async function init() {
  if (db) return db;
  if (!SQL) {
    const locateFile = (file: string) =>
      path.join(__dirname, "..", "node_modules", "sql.js", "dist", file);
    SQL = await initSqlJs({ locateFile });
  }

  if (fs.existsSync(DB_FILE)) {
    const filebuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(new Uint8Array(filebuffer));
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT,
      isDoctor INTEGER DEFAULT 0,
      sector TEXT,
      emailVerified INTEGER DEFAULT 0,
      createdAt TEXT,
      updatedAt TEXT
    );
  `);

  try {
    const info = db.prepare("PRAGMA table_info(users);");
    const cols: string[] = [];
    while (info.step()) {
      const row = info.getAsObject();
      if (row && row.name) cols.push(String(row.name));
    }
    info.free();

    const requiredCols: Array<{ name: string; stmt: string }> = [
      { name: "sector", stmt: "ALTER TABLE users ADD COLUMN sector TEXT;" },
      {
        name: "idFuncionario",
        stmt: "ALTER TABLE users ADD COLUMN idFuncionario INTEGER;",
      },
      { name: "cargo", stmt: "ALTER TABLE users ADD COLUMN cargo TEXT;" },
      {
        name: "dataAdmissao",
        stmt: "ALTER TABLE users ADD COLUMN dataAdmissao TEXT;",
      },
      {
        name: "cdPrestador",
        stmt: "ALTER TABLE users ADD COLUMN cdPrestador INTEGER;",
      },
      {
        name: "nmPrestador",
        stmt: "ALTER TABLE users ADD COLUMN nmPrestador TEXT;",
      },
      {
        name: "nmMnemonico",
        stmt: "ALTER TABLE users ADD COLUMN nmMnemonico TEXT;",
      },
      {
        name: "dsCodigoConselho",
        stmt: "ALTER TABLE users ADD COLUMN dsCodigoConselho TEXT;",
      },
      { name: "dsCRM", stmt: "ALTER TABLE users ADD COLUMN dsCRM TEXT;" },
      {
        name: "especialidade",
        stmt: "ALTER TABLE users ADD COLUMN especialidade TEXT;",
      },
      { name: "status", stmt: "ALTER TABLE users ADD COLUMN status TEXT;" },
    ];

    for (const c of requiredCols) {
      if (!cols.includes(c.name)) {
        try {
          db.run(c.stmt);
          persist();
        } catch (err) {
          console.warn(
            `Falha ao adicionar coluna ${c.name}`,
            err && err.toString ? err.toString() : err
          );
        }
      }
    }

    try {
      const tbl = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='doctors';"
      );
      const hasDoctors = tbl.step();
      tbl.free();
      if (hasDoctors) {
        try {
          db.run("BEGIN;");
          const migr = db.prepare("SELECT * FROM doctors;");
          while (migr.step()) {
            const r: any = migr.getAsObject();
            db.run(
              `UPDATE users SET cdPrestador = ?, nmPrestador = ?, nmMnemonico = ?, dsCodigoConselho = ?, dsCRM = ?, especialidade = ? WHERE id = ?`,
              [
                r.cdPrestador || null,
                r.nmPrestador || null,
                r.nmMnemonico || null,
                r.dsCodigoConselho || null,
                r.dsCRM || null,
                r.especialidade || null,
                r.userId,
              ]
            );
          }
          migr.free();
          db.run("DROP TABLE IF EXISTS doctors;");
          db.run("COMMIT;");
          persist();
        } catch (err) {
          try {
            db.run("ROLLBACK;");
          } catch (_) {}
          console.warn(
            "Falha ao migrar dados de doctors para users:",
            err && err.toString ? err.toString() : err
          );
        }
      }
    } catch (err) {
      console.warn(
        "Erro ao checar tabela doctors:",
        err && err.toString ? err.toString() : err
      );
    }
  } catch (err) {
    console.warn(
      "Erro ao verificar colunas da tabela users",
      err && err.toString ? err.toString() : err
    );
  }

  return db;
}

export function persist() {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DB_FILE, buffer);
}

export async function run<T = any>(sql: string, params: any[] = []) {
  const database = await init();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const results: any[] = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  if (!transactionActive) persist();
  return results as T[];
}

export async function runGet<T = any>(sql: string, params: any[] = []) {
  const database = await init();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const has = stmt.step();
  const row = has ? stmt.getAsObject() : null;
  stmt.free();
  if (!transactionActive) persist();
  return row as T | null;
}

let transactionActive = false;

export async function beginTransaction() {
  const database = await init();
  if (transactionActive) throw new Error("Transaction already active");
  database.run("BEGIN;");
  transactionActive = true;
}

export async function commitTransaction() {
  const database = await init();
  if (!transactionActive) throw new Error("No transaction is active");
  database.run("COMMIT;");
  transactionActive = false;
  persist();
}

export async function rollbackTransaction() {
  const database = await init();
  try {
    database.run("ROLLBACK;");
  } catch (_) {
    // ignore
  }
  transactionActive = false;
  persist();
}

export default {
  init,
  run,
  runGet,
  persist,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
};
