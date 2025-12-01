import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { DaySelector } from "../../components/DaySelector";
import { AppointmentCard } from "../../components/AppointmentCard";
import { InfoPanel } from "../../components/InfoPanel";
import { styles } from "./styles";
import { getCurrentWeek } from "../../utils/data";
import { getAgendamentosByDate, getInfoPanels } from "../../services/agendamentos.service";
import { Ionicons } from "@expo/vector-icons";

export function HomeScreen() {
  const navigation = useNavigation();

  const [weekDays, setWeekDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [panels, setPanels] = useState([]);
  const [loadingPanels, setLoadingPanels] = useState(true);

  const fetchAppointments = useCallback(async (day) => {
    setSelectedDay(day);
    const agendamentos = await getAgendamentosByDate(day.date);
    setAppointments(agendamentos);
  }, []);

  useEffect(() => {
    const week = getCurrentWeek();
    setWeekDays(week);

    const today = week.find((d) => d.isToday);
    if (today) fetchAppointments(today);

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

      {/* Seletor de dias */}
      <View style={styles.daySelectorContainer}>
        <DaySelector
          days={weekDays}
          selectedDate={selectedDay?.date}
          onSelectDay={fetchAppointments}
        />
      </View>

      {/* Painéis de informações */}
      <View style={styles.infoPanelsSection}>
        {loadingPanels
          ? <Text>Carregando informações...</Text>
          : panels.map((panel, index) => (
              <InfoPanel key={index} value={panel.value} label={panel.label} />
            ))}
      </View>

      {/* Ações rápidas */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.actionsGrid}>

          {/* NOVA CONSULTA */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("NovoAgendamento")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#EBF8FF" }]}>
              <Ionicons name="calendar-outline" size={24} color="#2B5BFF" />
            </View>
            <Text style={styles.actionText}>Nova Consulta</Text>
          </TouchableOpacity>

          {/* NOVO PACIENTE */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("PacientesNovo")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#F0FFF4" }]}>
              <Ionicons name="person-add-outline" size={24} color="#38A169" />
            </View>
            <Text style={styles.actionText}>Novo Paciente</Text>
          </TouchableOpacity>

          {/* NOVO MÉDICO */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("MedicosNovo")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#FFF5F5" }]}>
              <Ionicons name="medkit-outline" size={24} color="#E53E3E" />
            </View>
            <Text style={styles.actionText}>Novo Médico</Text>
          </TouchableOpacity>

          {/* NOVO FUNCIONÁRIO */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("FuncNovo")}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#FAF5FF" }]}>
              <Ionicons name="people-outline" size={24} color="#805AD5" />
            </View>
            <Text style={styles.actionText}>Novo Funcionário</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}
