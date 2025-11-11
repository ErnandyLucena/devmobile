import { Request, Response } from "express";
import { AppointmentsService } from "../services/appointments.service";

export const AppointmentsController = {
  async create(req: Request, res: Response) {
    try {
      const body = req.body as any;
      const {
        data,
        horaInicio,
        horaFim,
        status,
        tipoAgendamento,
        observacoes,
        paciente,
        medico,
      } = body;

      const missing: string[] = [];
      if (!data) missing.push("data");
      if (!horaInicio) missing.push("horaInicio");
      if (!horaFim) missing.push("horaFim");
      if (!paciente || typeof paciente.idPaciente === "undefined")
        missing.push("paciente.idPaciente");
      if (!medico || typeof medico.cdPrestador === "undefined")
        missing.push("medico.cdPrestador");

      if (missing.length)
        return res
          .status(400)
          .json({ error: `Missing required fields: ${missing.join(", ")}` });

      const created = await AppointmentsService.create({
        data,
        horaInicio,
        horaFim,
        status: status || null,
        tipoAgendamento: tipoAgendamento || null,
        observacoes: observacoes || null,
        pacienteId: paciente.idPaciente,
        medicoCdPrestador: medico.cdPrestador,
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
      const date = req.query.data ? String(req.query.data) : undefined;
      const pacienteId = req.query.pacienteId
        ? Number(req.query.pacienteId)
        : undefined;
      const medicoCdPrestador = req.query.medicoCdPrestador
        ? Number(req.query.medicoCdPrestador)
        : undefined;
      const status = req.query.status ? String(req.query.status) : undefined;

      const result = await AppointmentsService.list({
        page,
        limit,
        date,
        pacienteId,
        medicoCdPrestador,
        status,
      });
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) return res.status(400).json({ error: "Invalid id" });

      const body = req.body as any;
      const {
        data,
        horaInicio,
        horaFim,
        status,
        tipoAgendamento,
        observacoes,
        paciente,
        medico,
      } = body;

      const updatePayload: any = {};
      if (typeof data !== "undefined") updatePayload.data = data;
      if (typeof horaInicio !== "undefined") updatePayload.horaInicio = horaInicio;
      if (typeof horaFim !== "undefined") updatePayload.horaFim = horaFim;
      if (typeof status !== "undefined") updatePayload.status = status;
      if (typeof tipoAgendamento !== "undefined") updatePayload.tipoAgendamento = tipoAgendamento;
      if (typeof observacoes !== "undefined") updatePayload.observacoes = observacoes;
      if (paciente && typeof paciente.idPaciente !== "undefined") updatePayload.pacienteId = paciente.idPaciente;
      if (medico && typeof medico.cdPrestador !== "undefined") updatePayload.medicoCdPrestador = medico.cdPrestador;

      if (Object.keys(updatePayload).length === 0)
        return res.status(400).json({ error: "No fields to update" });

      const updated = await AppointmentsService.update(id, updatePayload);
      if (!updated) return res.status(404).json({ error: "Appointment not found" });
      return res.json(updated);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },
};
