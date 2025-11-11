import { Request, Response } from "express";
import fs from "fs";
import db, { DB_FILE } from "../db";

export const DebugController = {
  async dbInfo(req: Request, res: Response) {
    try {
      const usersRow = await db.runGet("SELECT COUNT(1) as cnt FROM users;", []);
      const patientsRow = await db.runGet("SELECT COUNT(1) as cnt FROM patients;", []);
      const appsRow = await db.runGet("SELECT COUNT(1) as cnt FROM appointments;", []);

      let fileInfo: any = null;
      try {
        const st = fs.statSync(DB_FILE);
        fileInfo = { path: DB_FILE, size: st.size, mtime: st.mtime };
      } catch (err) {
        fileInfo = { path: DB_FILE, exists: false };
      }

      return res.json({
        users: usersRow ? Number((usersRow as any).cnt) : 0,
        patients: patientsRow ? Number((patientsRow as any).cnt) : 0,
        appointments: appsRow ? Number((appsRow as any).cnt) : 0,
        file: fileInfo,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};
