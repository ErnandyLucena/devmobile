export const weekDays = [
  { day: "SEG", date: "9", isToday: false },
  { day: "TER", date: "10", isToday: false },
  { day: "QUA", date: "11", isToday: true },
  { day: "QUI", date: "12", isToday: false },
  { day: "SEX", date: "13", isToday: false },
  { day: "SAB", date: "14", isToday: false },
];

export const todayAppointments = [
  {
    id: "1", // Adicione ID
    hour: "10:00",
    title: "Atendimento Eletivo",
    patient: "Emandy Lucena",
    status: "confirmado"
  },
  {
    id: "2",
    hour: "10:00", 
    title: "Atendimento Eletivo",
    patient: "Emandy Lucena",
    status: "confirmado"
  }
];

export const getAppointmentById = (id: string) => {
  return todayAppointments.find(appointment => appointment.id === id) || todayAppointments[0];
};

export const infoPanels = [
  { value: "12", label: "Agendamento\neste mês" },
  { value: "8", label: "Pacientes\natendidos" },
  { value: "5", label: "Reconsultas\nagendadas" },
];