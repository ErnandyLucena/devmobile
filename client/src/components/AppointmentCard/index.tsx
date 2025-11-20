// AppointmentCard.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function AppointmentCard({ hour, title, patient }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.timeContainer}>
        <Text style={styles.hourText}>{hour}</Text>
      </View>
      
      <View style={styles.appointmentInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.patient}>{patient}</Text>
      </View>
    </TouchableOpacity>
  );
}