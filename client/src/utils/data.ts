export const weekDays = [
  { day: "SEG", date: "9", isToday: false },
  { day: "TER", date: "10", isToday: false },
  { day: "QUA", date: "11", isToday: true },
  { day: "QUI", date: "12", isToday: false },
  { day: "SEX", date: "13", isToday: false },
  { day: "SAB", date: "14", isToday: false },
];

export const todayAppointments = [
  { id: "1", hour: "10:00", title: "Atendimento Eletivo", patient: "Emandy Lucena", status: "confirmado", date: "25" },
  { id: "2", hour: "11:00", title: "Atendimento Eletivo", patient: "João Silva", status: "confirmado", date: "25" },
  { id: "3", hour: "09:00", title: "Atendimento Urgente", patient: "Maria Souza", status: "pendente", date: "26" },
];

export const infoPanels = [
  { value: "12", label: "Agendamentos\neste mês" },
  { value: "8", label: "Pacientes\natendidos" },
  { value: "5", label: "Reconsultas\nagendadas" },
];

export const getAppointmentById = (id: string) => {
  return todayAppointments.find(appointment => appointment.id === id) || todayAppointments[0];
};


// utils/dateUtils.ts
export function getCurrentWeek() {
  const today = new Date();
  const dayOfWeek = today.getDay(); 

  const monday = new Date(today);
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + diffToMonday);

  const week: Array<{ day: string; date: string; isToday: boolean }> = [];
  const dayNames = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);

    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();

    week.push({
      day: dayNames[i],
      date: d.getDate().toString(),
      isToday
    });
  }

  return week;
}
