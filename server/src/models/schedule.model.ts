export interface Schedule {
  id: number;
  medico_id: number;
  data_agenda: Date;
  horario: string;
  disponivel: boolean;
}