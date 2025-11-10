import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export const UsersController = {
  async listDoctors(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const specialty = (req.query.specialty as string) || undefined;
      const q = (req.query.q as string) || undefined; // busca por nome/email
      const result = await UsersService.listDoctors({
        page,
        limit,
        specialty,
        q,
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async listEmployees(req: Request, res: Response) {
    try {
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const sector =
        (req.query.sector as string) ||
        (req.query.setor as string) ||
        undefined;
      const status = (req.query.status as string) || undefined;
      const q = (req.query.q as string) || undefined;
      const result = await UsersService.listEmployees({
        page,
        limit,
        sector,
        status,
        q,
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await UsersService.getById(id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });
      return res.json(user);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  },
};
