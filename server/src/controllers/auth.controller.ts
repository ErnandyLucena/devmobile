import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        cpf,
        isDoctor,
        sector,
        setor,
        password,
        cdPrestador,
        nmPrestador,
        nmMnemonico,
        dsCodigoConselho,
        dsCRM,
        especialidade,
        // employee fields
        idFuncionario,
        cargo,
        dataAdmissao,
        status,
      } = req.body;

      const missing: string[] = [];
      if (!name) missing.push("name");
      if (!email) missing.push("email");
      if (!cpf) missing.push("cpf");
      if (typeof isDoctor === "undefined") missing.push("isDoctor");
      if (!password) missing.push("password");
      if (missing.length)
        return res
          .status(400)
          .json({ error: `Missing required fields: ${missing.join(", ")}` });

      if (isDoctor) {
        // para médico exigimos pelo menos dsCRM e especialidade (os demais são opcionais)
        if (!dsCRM)
          return res
            .status(400)
            .json({ error: "dsCRM é obrigatório para médicos" });
        if (!especialidade)
          return res
            .status(400)
            .json({ error: "especialidade é obrigatória para médicos" });
      } else {
        // para não médicos exigimos campos de funcionário
        const sectorVal = sector || (req.body as any).setor;
        if (!sectorVal)
          return res
            .status(400)
            .json({ error: "sector (ou setor) é obrigatório para não médicos" });
        if (typeof idFuncionario === "undefined" || idFuncionario === null)
          return res
            .status(400)
            .json({ error: "idFuncionario é obrigatório para não médicos" });
        if (!cargo)
          return res
            .status(400)
            .json({ error: "cargo é obrigatório para não médicos" });
        if (!dataAdmissao)
          return res
            .status(400)
            .json({ error: "dataAdmissao é obrigatória para não médicos" });
        if (!status)
          return res
            .status(400)
            .json({ error: "status é obrigatório para não médicos" });
      }

      const cpfDigits = String(cpf).replace(/\D/g, "");
      if (cpfDigits.length < 11)
        return res.status(400).json({ error: "Cpf inválido" });

      const user = await AuthService.register({
        name,
        email,
        cpf: cpfDigits,
        isDoctor: !!isDoctor,
  sector: sector || (req.body as any).setor || null,
        cdPrestador: cdPrestador || null,
        nmPrestador: nmPrestador || null,
        nmMnemonico: nmMnemonico || null,
        dsCodigoConselho: dsCodigoConselho || null,
        dsCRM: dsCRM || null,
        especialidade: especialidade || null,
  // employee
  idFuncionario: idFuncionario || null,
  cargo: cargo || null,
  dataAdmissao: dataAdmissao || null,
  status: status || null,
        password,
      });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      return res.json(result);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const userId = (req as any).userId as string;
      const user = await AuthService.me(userId);
      return res.json(user);
    } catch (err: any) {
      return res.status(401).json({ error: err.message });
    }
  },
};
