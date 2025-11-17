import { View, Text, ScrollView } from "react-native";
import { weekDays, todayAppointments, infoPanels } from "../../utils/data";
import { Header } from "../../components/Header";
import { DaySelector } from "../../components/DaySelector";
import { AppointmentCard } from "../../components/AppointmentCard";
import { InfoPanel } from "../../components/InfoPanel";
import { styles } from "./styles";

export function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Seletor de Dias */}
      <DaySelector days={weekDays} />

      {/* Painéis de Informação */}
      <View style={styles.infoPanelsSection}>
        {infoPanels.map((panel, index) => (
          <InfoPanel
            key={index}
            value={panel.value}
            label={panel.label}
          />
        ))}
      </View>

      {/* Agendamentos do dia */}
      <View style={styles.agendaSection}>
        <View style={styles.agendaHeader}>
          <Text style={styles.agendaTitle}>Agendamentos do dia</Text>
          <Text style={styles.agendaLink}>Ver tudo</Text>
        </View>

        {todayAppointments.map((appointment, index) => (
          <AppointmentCard
            key={index}
            hour={appointment.hour}
            title={appointment.title}
            patient={appointment.patient}
          />
        ))}
      </View>
    </ScrollView>
  );
}