import { Request, Response } from "express";
import { PatientsService } from "../services/patients.service";

export const PatientsController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, cpf, email, telefone } = req.body as any;
      const missing: string[] = [];
      if (!nome) missing.push("nome");
      if (!cpf) missing.push("cpf");
      if (!email) missing.push("email");
      if (missing.length)
        return res
          .status(400)
          .json({ error: `Missing required fields: ${missing.join(", ")}` });

      const created = await PatientsService.create({
        nome,
        cpf: String(cpf).replace(/\D/g, ""),
        email,
        telefone: telefone || null,
      });

      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
  async list(req: Request, res: Response) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const q = req.query.q ? String(req.query.q) : undefined;

      const result = await PatientsService.list({ page, limit, q });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) return res.status(400).json({ error: "Invalid id" });
      const user = await PatientsService.getById(id);
      if (!user) return res.status(404).json({ error: "Patient not found" });
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
