import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { DaySelector } from "../../components/DaySelector";
import { AppointmentCard } from "../../components/AppointmentCard";
import { InfoPanel } from "../../components/InfoPanel";
import { styles } from "./styles";
import { getCurrentWeek } from "../../utils/data"; 
import { getAgendamentosByDate, getInfoPanels } from "../../services/agendamentos.service"

export function HomeScreen() {
  const navigation = useNavigation();

  const [weekDays, setWeekDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [panels, setPanels] = useState([]);
  const [loadingPanels, setLoadingPanels] = useState(true);

  // Função para buscar agendamentos por dia
  const fetchAppointments = useCallback(async (day) => {
    setSelectedDay(day);
    const agendamentos = await getAgendamentosByDate(day.date);
    setAppointments(agendamentos);
  }, []);

  // Carregar semana e painel apenas uma vez
  useEffect(() => {
    const week = getCurrentWeek();
    setWeekDays(week);

    // Seleciona o dia de hoje automaticamente
    const today = week.find(d => d.isToday);
    if (today) {
      fetchAppointments(today);
    }

    // Carregar painéis
    (async () => {
      setLoadingPanels(true);
      const data = await getInfoPanels();
      setPanels(data);
      setLoadingPanels(false);
    })();
  }, [fetchAppointments]);

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Seletor de Dias */}
      <View style={styles.daySelectorContainer}>
        <DaySelector 
          days={weekDays} 
          selectedDate={selectedDay?.date}
          onSelectDay={fetchAppointments} 
        />
      </View>

      {/* Painéis de Informação */}
      <View style={styles.infoPanelsSection}>
        {loadingPanels ? (
          <Text>Carregando informações...</Text>
        ) : (
          panels.map((panel, index) => (
            <InfoPanel key={index} value={panel.value} label={panel.label} />
          ))
        )}
      </View>

      {/* Agendamentos do dia */}
      <View style={styles.agendaSection}>
        <View style={styles.agendaHeader}>
          <Text style={styles.agendaTitle}>Agendamentos do dia</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Agendamentos")}>
            <Text style={styles.agendaLink}>Ver tudo</Text>
          </TouchableOpacity>
        </View>

        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              hour={appointment.horaInicio}
              title={appointment.tipoAgendamento}
              patient={appointment.nomePaciente}
            />
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum agendamento neste dia
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
