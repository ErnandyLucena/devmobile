import { View, Text, StyleSheet } from "react-native";
import { styles } from "./styles";

export function AppointmentCard({ hour, title, patient }) {
  return (
    <View style={styles.card}>
      <View>
        <View style={styles.hourBox}>
          <Text style={styles.hourText}>{hour}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.patient}>{patient}</Text>
      </View>
    </View>
  );
}

