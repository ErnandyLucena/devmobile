export interface Appointment {
  id: number;
  paciente_id: number;
  medico_id: number;
  data_consulta: Date;
  status: string;
  observacoes?: string;
}